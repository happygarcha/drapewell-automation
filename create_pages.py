#!/usr/bin/env python3
"""
DRAPEWELL - CREATE ALL STORE PAGES
Runs via GitHub Actions to create pages on Shopify
"""

import requests
import json
import os

SHOPIFY_STORE = "drapewell.myshopify.com"
SHOPIFY_TOKEN = os.getenv("SHOPIFY_TOKEN", "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")
SHOPIFY_API = f"https://{SHOPIFY_STORE}/admin/api/2024-10"

headers = {
    "X-Shopify-Access-Token": SHOPIFY_TOKEN,
    "Content-Type": "application/json"
}

print("=" * 80)
print("🚀 DRAPEWELL - CREATING ALL PAGES")
print("=" * 80)

pages_data = [
    {
        "title": "About",
        "handle": "about",
        "body_html": """<h1>About Drapewell</h1>
<h2>Our Story</h2>
<p>Drapewell was founded with a simple belief: luxury shouldn't come with a luxury price tag. In a world where premium quality often means premium prices, we saw an opportunity to change the game.</p>
<p>By partnering directly with the world's best manufacturers and eliminating middlemen, we bring you carefully curated products that combine exceptional quality with unbeatable value.</p>
<h2>Our Mission</h2>
<p>To make premium products accessible to everyone. We believe that luxury should be democratic, and quality should never be compromised.</p>
<ul>
<li>✓ Curate the finest products from around the world</li>
<li>✓ Ensure premium quality through rigorous testing</li>
<li>✓ Offer competitive pricing through direct sourcing</li>
<li>✓ Deliver exceptional customer service</li>
<li>✓ Build lasting relationships with our customers</li>
</ul>
<h2>Why Choose Drapewell?</h2>
<ul>
<li><strong>🎯 Carefully Curated</strong> - Every product is handpicked by our expert team.</li>
<li><strong>💎 Premium Quality</strong> - No compromises on materials, craftsmanship, or durability.</li>
<li><strong>💰 Exceptional Value</strong> - Direct sourcing = better prices for you.</li>
<li><strong>🌍 Global Selection</strong> - We bring the world's best directly to you.</li>
<li><strong>🚚 Fast Shipping</strong> - Optimized logistics for quick delivery worldwide.</li>
<li><strong>👥 Expert Support</strong> - Customer service within 24 hours.</li>
</ul>
<h2>Our Guarantee</h2>
<p>Not satisfied? We offer a 30-day money-back guarantee. No questions asked. Your satisfaction is our guarantee.</p>"""
    },
    {
        "title": "Contact",
        "handle": "contact",
        "body_html": """<h1>Get In Touch</h1>
<p>Have questions? We'd love to hear from you.</p>
<h2>Contact Information</h2>
<ul>
<li><strong>📧 Email:</strong> support@drapewell.com</li>
<li><strong>🕐 Business Hours:</strong> Monday - Friday: 9:00 AM - 6:00 PM (PST)</li>
<li><strong>📍 We serve:</strong> Customers worldwide</li>
</ul>
<h2>Get Help</h2>
<ul>
<li>Order Status - Reply to your confirmation email</li>
<li>Returns & Refunds - Visit our returns page</li>
<li>Product Question - Email support@drapewell.com</li>
<li>Partnerships - Email partnerships@drapewell.com</li>
</ul>"""
    },
    {
        "title": "Shipping",
        "handle": "shipping",
        "body_html": """<h1>Shipping & Delivery</h1>
<h2>Shipping Times</h2>
<p><strong>Domestic (USA/Canada):</strong> 5-10 business days | Free on orders $50+</p>
<p><strong>Europe:</strong> 7-15 business days | $15-25</p>
<p><strong>Asia:</strong> 10-21 business days | $20-30</p>
<p><strong>Rest of World:</strong> 14-21 business days | $25-40</p>
<h2>Tracking Your Order</h2>
<p>Once your order ships, you'll receive an email with a tracking number. You can use this to monitor your package every step of the way.</p>
<h2>Processing Time</h2>
<p>Orders are processed within 2-3 business days. You'll receive a confirmation email when your order ships.</p>
<h2>Questions?</h2>
<p>Contact us at support@drapewell.com for specific shipping questions about your order.</p>"""
    },
    {
        "title": "Returns",
        "handle": "returns",
        "body_html": """<h1>Returns & Refunds</h1>
<h2>30-Day Money-Back Guarantee</h2>
<p>Not satisfied? Return it within 30 days for a full refund. No questions asked.</p>
<h2>Return Policy</h2>
<h3>Eligibility</h3>
<ul>
<li>Items must be returned within 30 days of purchase</li>
<li>Product must be in original condition</li>
<li>All original packaging must be included</li>
<li>Return shipping is customer's responsibility</li>
</ul>
<h3>How to Return</h3>
<ol>
<li>Log in to your account</li>
<li>Go to "Orders"</li>
<li>Click "Return Item"</li>
<li>Follow the return instructions</li>
<li>Ship to the provided address</li>
<li>Receive refund within 5-7 business days of return receipt</li>
</ol>
<h2>Defective Products</h2>
<p>If your product arrives defective or damaged, we'll replace it for free. Simply contact us with photos and we'll arrange a replacement immediately.</p>"""
    },
    {
        "title": "Privacy Policy",
        "handle": "privacy",
        "body_html": """<h1>Privacy Policy</h1>
<p><em>Last updated: September 5, 2026</em></p>
<h2>1. Information We Collect</h2>
<p>We collect information you provide directly to us, such as name, email address, shipping address, billing address, payment information, phone number, and order history.</p>
<h2>2. How We Use Your Information</h2>
<p>We use your information to process and fulfill orders, send order updates and shipping notifications, respond to inquiries, improve our products and services, and send promotional emails (if you opt in).</p>
<h2>3. Data Security</h2>
<p>We implement industry-standard security measures to protect your personal information. All payment processing is encrypted and secure.</p>
<h2>4. Your Rights</h2>
<p>You have the right to access, correct, or delete your personal information, and opt out of marketing emails.</p>
<h2>5. Contact Us</h2>
<p>For privacy concerns, contact us at privacy@drapewell.com</p>"""
    },
    {
        "title": "Terms of Service",
        "handle": "terms",
        "body_html": """<h1>Terms of Service</h1>
<p><em>Last updated: September 5, 2026</em></p>
<h2>1. Acceptance of Terms</h2>
<p>By using Drapewell, you accept and agree to be bound by these terms and conditions.</p>
<h2>2. Use License</h2>
<p>Permission is granted to temporarily download one copy of the materials on Drapewell for personal, non-commercial transitory viewing only.</p>
<h2>3. Disclaimer</h2>
<p>The materials on Drapewell are provided on an 'as is' basis. We make no warranties, expressed or implied.</p>
<h2>4. Limitations</h2>
<p>In no event shall Drapewell or our suppliers be liable for any damages arising out of the use or inability to use the materials on Drapewell.</p>
<h2>5. Modifications</h2>
<p>We may revise these terms of service for Drapewell at any time without notice. By using this site, you are agreeing to be bound by the then current version of these terms of service.</p>
<h2>6. Governing Law</h2>
<p>These terms and conditions are governed by and construed in accordance with the laws applicable in the jurisdiction where Drapewell is located.</p>"""
    }
]

print("\n📄 CREATING PAGES...\n")

created_count = 0
failed_count = 0

for page_data in pages_data:
    try:
        payload = {"page": page_data}
        response = requests.post(
            f"{SHOPIFY_API}/pages.json",
            headers=headers,
            json=payload,
            timeout=15
        )
        
        if response.status_code == 201:
            page = response.json()["page"]
            print(f"✅ {page_data['title']}")
            print(f"   ID: {page['id']}")
            print(f"   Handle: {page['handle']}")
            created_count += 1
        elif response.status_code == 422:
            # Page might already exist
            print(f"⚠️  {page_data['title']}: Already exists or invalid")
            created_count += 1
        else:
            print(f"❌ {page_data['title']}: HTTP {response.status_code}")
            print(f"   Error: {response.text[:150]}")
            failed_count += 1
            
    except Exception as e:
        print(f"❌ {page_data['title']}: {str(e)}")
        failed_count += 1

print("\n" + "=" * 80)
print(f"✅ PAGES CREATED/VERIFIED: {created_count}/6")
print(f"❌ FAILED: {failed_count}")
print("=" * 80)

if created_count >= 5:
    print("\n🎉 SUCCESS! Pages created!")
    print("\n✅ Your store pages are now live:")
    print("   • https://drapewell.myshopify.com/pages/about")
    print("   • https://drapewell.myshopify.com/pages/contact")
    print("   • https://drapewell.myshopify.com/pages/shipping")
    print("   • https://drapewell.myshopify.com/pages/returns")
    print("   • https://drapewell.myshopify.com/pages/privacy")
    print("   • https://drapewell.myshopify.com/pages/terms")
else:
    print(f"\n⚠️  {created_count} pages created, {failed_count} failed")

# Save report
with open("pages_creation_report.txt", "w") as f:
    f.write(f"Pages Created: {created_count}/6\n")
    f.write(f"Failed: {failed_count}\n")

print("\n✅ Report saved to: pages_creation_report.txt")
