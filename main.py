#!/usr/bin/env python3
"""
Drapewell Complete Automation - Syncs to Shopify
This is the CORRECT script that actually creates products in Shopify
"""

import requests
import json
import os
from datetime import datetime

SHOPIFY_STORE = "drapewell.myshopify.com"
SHOPIFY_TOKEN = os.getenv("SHOPIFY_TOKEN", "")
SHOPIFY_API = f"https://{SHOPIFY_STORE}/admin/api/2024-10"

print("[{}] 🚀 DRAPEWELL AUTOMATION STARTING".format(datetime.now().strftime("%Y-%m-%d %H:%M:%S")))

# Test products
products = [
    {"title": "LED Light Therapy Mask", "category": "beauty", "cost": 25.00, "stock": 50},
    {"title": "Magnetic Phone Charger 15W", "category": "tech", "cost": 12.00, "stock": 100},
    {"title": "K-Beauty Skincare Set 3-Step", "category": "beauty", "cost": 18.50, "stock": 75},
    {"title": "Silicone Cooking Utensil Set", "category": "home", "cost": 8.50, "stock": 120},
    {"title": "Smart Pet Feeder with Camera", "category": "pet", "cost": 35.00, "stock": 30},
]

print("[{}] Found {} products".format(datetime.now().strftime("%Y-%m-%d %H:%M:%S"), len(products)))

# Collection descriptions for SEO
descriptions = {
    "beauty": "Professional skincare and beauty tools. Premium quality, trusted by thousands. Fast worldwide shipping.",
    "tech": "Advanced tech gadgets and smart devices. High performance, reliable technology for tech lovers.",
    "home": "Quality home and kitchen essentials. Durable, stylish design with 30-day guarantee.",
    "pet": "Safe and durable pet products your pets will love. Recommended by pet owners worldwide.",
}

headers = {
    "X-Shopify-Access-Token": SHOPIFY_TOKEN,
    "Content-Type": "application/json"
}

synced = 0
failed = 0
results = []

print("\n📤 SYNCING TO SHOPIFY:\n")

for product in products:
    try:
        title = product["title"]
        category = product["category"]
        cost = product["cost"]
        stock = product["stock"]
        price = cost * 2.5  # 150% markup
        
        desc = descriptions.get(category, "High-quality product. Fast shipping worldwide.")
        
        payload = {
            "product": {
                "title": title,
                "body_html": f"<p>{desc}</p>",
                "vendor": "CJ Dropshipping",
                "product_type": category.capitalize(),
                "tags": f"{category},trending,dropshipping",
                "variants": [{
                    "title": "Default",
                    "price": str(round(price, 2)),
                    "sku": f"CJ-{category[:3].upper()}-{synced+1}",
                    "inventory_quantity": stock
                }]
            }
        }
        
        response = requests.post(
            f"{SHOPIFY_API}/products.json",
            headers=headers,
            json=payload,
            timeout=10
        )
        
        if response.status_code == 201:
            product_id = response.json().get("product", {}).get("id")
            print("[{}] ✓ Synced: {} (ID: {})".format(
                datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
                title,
                product_id
            ))
            synced += 1
            results.append({
                "title": title,
                "category": category,
                "cost": cost,
                "price": round(price, 2),
                "shopify_id": product_id,
                "status": "✅ Synced"
            })
        else:
            print("[{}] ❌ Failed: {} (HTTP {})".format(
                datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
                title,
                response.status_code
            ))
            failed += 1
            results.append({
                "title": title,
                "category": category,
                "status": f"❌ Failed (HTTP {response.status_code})"
            })
    
    except Exception as e:
        print("[{}] ❌ Error: {}".format(datetime.now().strftime("%Y-%m-%d %H:%M:%S"), str(e)))
        failed += 1

# Save report
report = f"""
================================================================================
DRAPEWELL SHOPIFY SYNC REPORT
{datetime.now().strftime("%Y-%m-%d %H:%M:%S")}
================================================================================

SYNC RESULTS:
  ✅ Successfully Synced: {synced}
  ❌ Failed: {failed}
  📊 Total Processed: {synced + failed}

STATUS: {'SUCCESS ✅' if failed == 0 else 'PARTIAL ⚠️'}

PRODUCTS SYNCED:
"""

for r in results:
    if r.get("status") == "✅ Synced":
        report += f"\n  ✅ {r['title']}"
        report += f"\n     Category: {r['category']}"
        report += f"\n     Cost: ${r['cost']:.2f} → Price: ${r['price']:.2f}"
        report += f"\n     Shopify ID: {r['shopify_id']}"

if failed > 0:
    report += f"\n\nFAILED PRODUCTS:"
    for r in results:
        if r.get("status") != "✅ Synced":
            report += f"\n  {r['status']}: {r['title']}"

report += f"""

AUTOMATION INFO:
  Store: {SHOPIFY_STORE}
  Schedule: Daily at 6:00 AM UTC
  Collections: Beauty, Tech, Home & Kitchen, Pet Supplies, Fashion
  Markup: 150% (2.5x cost)

NEXT RUN: Tomorrow at 6:00 AM UTC

================================================================================
"""

with open("drapewell_sync_report.txt", "w") as f:
    f.write(report)

print("\n" + report)
print("[{}] ✓ Automation complete".format(datetime.now().strftime("%Y-%m-%d %H:%M:%S")))
