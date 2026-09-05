#!/usr/bin/env python3
"""
Drapewell Complete Automation Engine v2.0
- Syncs products from CJ Dropshipping
- Creates/updates store pages
- 100% cloud-based, no manual work needed
"""

import os
import json
import requests
from datetime import datetime
import logging

# ═══════════════════════════════════════════════════════════════
# CONFIGURATION
# ═══════════════════════════════════════════════════════════════

# API Endpoints
SHOPIFY_STORE = "drapewell"
SHOPIFY_API_URL = f"https://{SHOPIFY_STORE}.myshopify.com/admin/api/2026-01"
CJ_API_URL = "https://api.cjdropshipping.com/v1"

# Credentials (from GitHub Secrets)
SHOPIFY_TOKEN = os.getenv("SHOPIFY_TOKEN")
CJ_API_TOKEN = os.getenv("CJ_API_TOKEN")

# Logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# ═══════════════════════════════════════════════════════════════
# PART 1: PRODUCT SYNC (EXISTING - ENHANCED)
# ═══════════════════════════════════════════════════════════════

class ProductSyncer:
    """Syncs products from CJ Dropshipping to Shopify"""
    
    def __init__(self):
        self.shopify_headers = {
            "X-Shopify-Access-Token": SHOPIFY_TOKEN,
            "Content-Type": "application/json"
        }
        self.cj_headers = {
            "Authorization": f"Bearer {CJ_API_TOKEN}",
            "Content-Type": "application/json"
        }
        self.report = {
            "timestamp": datetime.now().isoformat(),
            "products_synced": 0,
            "products_failed": 0,
            "errors": []
        }
    
    def get_cj_products(self, limit=5):
        """Fetch products from CJ Dropshipping API"""
        try:
            logger.info("Fetching products from CJ Dropshipping...")
            response = requests.get(
                f"{CJ_API_URL}/product/list",
                headers=self.cj_headers,
                params={"limit": limit}
            )
            response.raise_for_status()
            data = response.json()
            logger.info(f"Retrieved {len(data.get('items', []))} products from CJ")
            return data.get('items', [])
        except Exception as e:
            logger.error(f"CJ API Error: {str(e)}")
            self.report["errors"].append(f"CJ API fetch failed: {str(e)}")
            return []
    
    def create_shopify_product(self, product):
        """Create or update product in Shopify via GraphQL"""
        try:
            # Build GraphQL mutation
            title = product.get('productName', 'Unknown Product')
            description = product.get('description', 'Premium quality product')
            price = float(product.get('price', 0)) * 2.5  # 150% markup
            images = product.get('images', [])
            
            # Create product with variants
            mutation = """
            mutation CreateProduct($input: ProductInput!) {
                productCreate(input: $input) {
                    product {
                        id
                        title
                        handle
                    }
                    userErrors {
                        field
                        message
                    }
                }
            }
            """
            
            variables = {
                "input": {
                    "title": title,
                    "bodyHtml": f"<p>{description}</p>",
                    "productType": "Dropshipping",
                    "vendor": "CJ Dropshipping",
                    "tags": ["dropshipping", "trending", "new"],
                    "images": [{"src": img} for img in images[:3]]  # Max 3 images
                }
            }
            
            response = requests.post(
                f"{SHOPIFY_API_URL}/graphql.json",
                headers=self.shopify_headers,
                json={"query": mutation, "variables": variables}
            )
            response.raise_for_status()
            data = response.json()
            
            if "errors" in data:
                raise Exception(str(data["errors"]))
            
            self.report["products_synced"] += 1
            logger.info(f"Created product: {title}")
            return True
            
        except Exception as e:
            logger.error(f"Product creation failed: {str(e)}")
            self.report["products_failed"] += 1
            self.report["errors"].append(f"Product '{product.get('productName')}' failed: {str(e)}")
            return False
    
    def sync_products(self):
        """Sync all products"""
        logger.info("=== COMPONENT 1: PRODUCT SYNC ===")
        products = self.get_cj_products()
        
        for product in products:
            self.create_shopify_product(product)
        
        logger.info(f"Product sync complete: {self.report['products_synced']} success, {self.report['products_failed']} failed")
        return self.report

# ═══════════════════════════════════════════════════════════════
# PART 2: PAGES CREATION (NEW)
# ═══════════════════════════════════════════════════════════════

class PagesCreator:
    """Creates and updates store pages automatically"""
    
    def __init__(self):
        self.shopify_headers = {
            "X-Shopify-Access-Token": SHOPIFY_TOKEN,
            "Content-Type": "application/json"
        }
        self.report = {
            "timestamp": datetime.now().isoformat(),
            "pages_created": 0,
            "pages_failed": 0,
            "errors": []
        }
        
        # Page definitions
        self.pages = {
            "about": {
                "title": "About",
                "handle": "about",
                "body": """<h1>About Drapewell</h1>

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
            "contact": {
                "title": "Contact",
                "handle": "contact",
                "body": """<h1>Get In Touch</h1>

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
            "shipping": {
                "title": "Shipping",
                "handle": "shipping",
                "body": """<h1>Shipping & Delivery</h1>

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
            "returns": {
                "title": "Returns",
                "handle": "returns",
                "body": """<h1>Returns & Refunds</h1>

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
            "privacy": {
                "title": "Privacy Policy",
                "handle": "privacy-policy",
                "body": """<h1>Privacy Policy</h1>

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
            "terms": {
                "title": "Terms of Service",
                "handle": "terms-of-service",
                "body": """<h1>Terms of Service</h1>

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
        }
    
    def create_page(self, page_key, page_data):
        """Create or update a page via GraphQL"""
        try:
            logger.info(f"Creating page: {page_data['title']}")
            
            mutation = """
            mutation CreatePage($input: PageInput!) {
                pageCreate(input: $input) {
                    page {
                        id
                        title
                        handle
                        status
                    }
                    userErrors {
                        field
                        message
                    }
                }
            }
            """
            
            variables = {
                "input": {
                    "title": page_data['title'],
                    "handle": page_data['handle'],
                    "bodyHtml": page_data['body'],
                    "status": "ACTIVE"
                }
            }
            
            response = requests.post(
                f"{SHOPIFY_API_URL}/graphql.json",
                headers=self.shopify_headers,
                json={"query": mutation, "variables": variables}
            )
            response.raise_for_status()
            data = response.json()
            
            if "errors" in data or data.get("data", {}).get("pageCreate", {}).get("userErrors"):
                errors = data.get("errors", []) or data.get("data", {}).get("pageCreate", {}).get("userErrors", [])
                raise Exception(str(errors))
            
            self.report["pages_created"] += 1
            logger.info(f"✓ Page created: {page_data['title']}")
            return True
            
        except Exception as e:
            logger.error(f"Page creation failed for {page_data['title']}: {str(e)}")
            self.report["pages_failed"] += 1
            self.report["errors"].append(f"Page '{page_data['title']}' failed: {str(e)}")
            return False
    
    def create_all_pages(self):
        """Create all pages"""
        logger.info("=== COMPONENT 2: PAGES CREATION ===")
        
        for page_key, page_data in self.pages.items():
            self.create_page(page_key, page_data)
        
        logger.info(f"Pages creation complete: {self.report['pages_created']} success, {self.report['pages_failed']} failed")
        return self.report

# ═══════════════════════════════════════════════════════════════
# MAIN ORCHESTRATION
# ═══════════════════════════════════════════════════════════════

def main():
    """Main automation orchestration"""
    logger.info("╔════════════════════════════════════════════════════╗")
    logger.info("║  DRAPEWELL COMPLETE AUTOMATION ENGINE v2.0         ║")
    logger.info("║  Products + Pages + Independent Components         ║")
    logger.info("╚════════════════════════════════════════════════════╝")
    
    all_reports = {
        "run_timestamp": datetime.now().isoformat(),
        "components": {}
    }
    
    # COMPONENT 1: Product Sync
    try:
        product_syncer = ProductSyncer()
        product_report = product_syncer.sync_products()
        all_reports["components"]["products"] = product_report
    except Exception as e:
        logger.error(f"Product sync failed: {str(e)}")
        all_reports["components"]["products"] = {"error": str(e)}
    
    # COMPONENT 2: Pages Creation
    try:
        pages_creator = PagesCreator()
        pages_report = pages_creator.create_all_pages()
        all_reports["components"]["pages"] = pages_report
    except Exception as e:
        logger.error(f"Pages creation failed: {str(e)}")
        all_reports["components"]["pages"] = {"error": str(e)}
    
    # SAVE REPORT
    report_file = "drapewell_automation_report.json"
    with open(report_file, "w") as f:
        json.dump(all_reports, f, indent=2)
    logger.info(f"\nReport saved to: {report_file}")
    
    # SUMMARY
    logger.info("\n╔════════════════════════════════════════════════════╗")
    logger.info("║                  SUMMARY                           ║")
    logger.info("╚════════════════════════════════════════════════════╝")
    
    product_data = all_reports.get("components", {}).get("products", {})
    pages_data = all_reports.get("components", {}).get("pages", {})
    
    logger.info(f"✓ Products: {product_data.get('products_synced', 0)} synced, {product_data.get('products_failed', 0)} failed")
    logger.info(f"✓ Pages: {pages_data.get('pages_created', 0)} created, {pages_data.get('pages_failed', 0)} failed")
    
    if product_data.get("errors"):
        logger.warning(f"Product errors: {product_data['errors']}")
    if pages_data.get("errors"):
        logger.warning(f"Pages errors: {pages_data['errors']}")
    
    logger.info("\n✅ Automation cycle complete!\n")

if __name__ == "__main__":
    main()
