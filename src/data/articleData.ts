import { timestampDaysAgo, randomTimestampLast } from '../utils/dates';

// Define Article interface
export interface Article {
  id: number;
  title: string;
  slug: string;
  timestamp: number;
  summary: string;
  content: string;
  image: string;
  coverImage?: string;
  readTime?: string;
  author: string;
}

// Helper function to create slugs
export const slugify = (text: string): string =>
  text
    .toLowerCase()
    .replace(/ /g, '-')
    .replace(/[^\w-]+/g, '');

// Helper function to find an article by ID
export const findArticleById = (id: string): Article | undefined => {
  const numericId = parseInt(id, 10);
  return articles.find(post => post.id === numericId);
};

// Helper function to find an article by slug
export const findArticleBySlug = (slug: string): Article | undefined => {
  return articles.find(post => post.slug === slug);
};

// Raw article data with fixed timestamps
const rawArticles = [
  {
    id: 1,
    title: "WordPress vs Custom Web Development: Making the Right Choice",
    summary: "A comprehensive comparison of WordPress and custom web development approaches, helping you make the right choice for your project based on budget, timeline, and technical requirements.",
    content: `# WordPress vs Custom Web Development: Making the Right Choice

## Introduction
Choosing the right approach for your website can shape your online success. Two common paths are WordPress and custom web development. This article outlines their differences, highlights strengths and weaknesses, and helps you decide which suits your project best.

---

## What Is WordPress?
WordPress is an open-source content-management system (CMS). It powers over 40 per cent of all websites worldwide. You install a theme, add plugins and start publishing — no coding skills required.

### Pros of WordPress
- **Speed to market**  
  Ready-made themes and plugins let you launch quickly.
- **Cost-effective**  
  Many themes and plugins are free or low-cost.
- **Easy maintenance**  
  Automatic updates and a large support community simplify upkeep.
- **Extensibility**  
  Thousands of plugins cover SEO, e-commerce, analytics and more.

### Cons of WordPress
- **Performance limits**  
  Too many plugins can slow page loads.
- **Security risks**  
  Popularity makes it a frequent target; timely updates are vital.
- **Customisation constraints**  
  Deep design or functionality changes may require custom coding anyway.
- **Plugin dependency**  
  Reliant on third-party code quality; conflicts can occur.

---

## What Is Custom Web Development?
Custom development means building a site from the ground up using languages like HTML, CSS, JavaScript and back-end frameworks (e.g. Django, Ruby on Rails, Node.js). It offers full control over design, features and performance.

### Pros of Custom Development
- **Unlimited flexibility**  
  Tailor every detail to your brand and user needs.
- **Optimised performance**  
  Lean codebase results in faster load times.
- **Enhanced security**  
  Unique code reduces risks from common CMS exploits.
- **Scalability**  
  Architect for growth; integrate complex systems smoothly.

### Cons of Custom Development
- **Higher cost**  
  Skilled developers take time and budget.
- **Longer timeline**  
  Building from scratch extends development and testing phases.
- **Ongoing maintenance**  
  You'll need developers for updates, bug fixes and new features.
- **Dependency on experts**  
  Harder to switch agencies without detailed documentation.

---

## Key Factors to Consider

| Factor | WordPress | Custom Development |
|--------|-----------|-------------------|
| Budget | Low initial cost | Medium to high |
| Timeline | Weeks | Months |
| Technical skill | Minimal | Advanced |
| Custom needs | Limited by themes/plugins | Unlimited |
| Performance | Good, but plugin-dependent | Optimised |
| Security | Needs frequent updates | Inherent, but still requires vigilance |
| Maintenance | Easy updates via dashboard | Requires developer support |

---

## Making the Right Choice
1. **Assess your budget and timeline**  
   If you need a site fast and cheaply, WordPress wins. If you have time and funds, custom pays off.  
2. **Define your technical needs**  
   For simple blogs, portfolios or small shops, WordPress is ideal. For unique applications (custom portals, advanced integrations), choose custom.  
3. **Evaluate future growth**  
   WordPress scales, but complex scaling can become costly. Custom solutions can be built with growth in mind.  
4. **Consider maintenance resources**  
   If you lack in-house developers, WordPress's simplicity is a plus. If you have a tech team, custom lends itself to deeper control.

---

## Conclusion
WordPress and custom web development each have a clear place. WordPress offers speed, ease and affordability, while custom development delivers flexibility, performance and security. Weigh your project's scope, budget, timeline and growth plans, then choose the path that aligns best with your goals.`,
    image: "https://i.ibb.co/rPmRbqX/3ced2984-6435-48b1-8de8-a41fad0cd221.webp",
    coverImage: "https://i.ibb.co/rPmRbqX/3ced2984-6435-48b1-8de8-a41fad0cd221.webp",
    readTime: "5",
    timestamp: new Date('2025-05-01').getTime()
  },
  {
    id: 2,
    title: "Product Development: Using Mockups to Visualize Your Equine Products",
    summary: "Learn how to use mockups to visualize and refine your equine product designs before production. Discover tools and techniques for creating realistic product previews.",
    content: `# Product Development: Using Mockups to Visualize Your Equine Products

Creating a new equine product is exciting, but it can be challenging to visualize how it will look in real life. That's where mockups come in. They help you see your product before it exists, making it easier to refine and perfect your design.

## What Are Mockups?

Mockups are digital or physical representations of your product. They show how your product will look in real-world situations, helping you and potential customers visualize the final result.

## Benefits of Using Mockups

1. **Better Visualization**
   - See your product in context
   - Understand proportions and scale
   - Identify potential design issues

2. **Improved Communication**
   - Share your vision with manufacturers
   - Get feedback from potential customers
   - Present to investors or partners

3. **Cost Savings**
   - Catch design flaws early
   - Reduce prototyping costs
   - Minimize production mistakes

## Types of Mockups

### Digital Mockups
- 3D renderings
- Photoshop templates
- Online mockup generators

### Physical Mockups
- 3D printed prototypes
- Handmade samples
- Material swatches

## Creating Effective Mockups

1. **Start with Basic Shapes**
   - Focus on proportions
   - Consider ergonomics
   - Think about materials

2. **Add Details Gradually**
   - Include branding elements
   - Show different angles
   - Demonstrate functionality

3. **Test in Real Contexts**
   - Show product in use
   - Consider different environments
   - Test with target audience

## Tools for Creating Mockups

### Digital Tools
- Adobe Photoshop
- Blender
- SketchUp
- Canva
- Placeit

### Physical Tools
- 3D printers
- Foam core
- Cardboard
- Fabric samples

## Best Practices

1. **Keep It Simple**
   - Focus on key features
   - Avoid unnecessary details
   - Make it easy to understand

2. **Be Realistic**
   - Use accurate colors
   - Show proper scale
   - Consider materials

3. **Get Feedback**
   - Show to potential customers
   - Ask for honest opinions
   - Be open to changes

## Common Mistakes to Avoid

1. **Overcomplicating**
   - Too many details
   - Unrealistic features
   - Confusing presentation

2. **Poor Quality**
   - Low-resolution images
   - Inaccurate proportions
   - Unprofessional look

3. **Missing Context**
   - No scale reference
   - Unclear usage
   - Isolated presentation

## Next Steps

1. **Refine Your Design**
   - Make necessary adjustments
   - Test different versions
   - Get more feedback

2. **Prepare for Production**
   - Create technical drawings
   - Choose materials
   - Find manufacturers

3. **Plan Your Launch**
   - Create marketing materials
   - Build anticipation
   - Prepare for sales

## Conclusion

Mockups are a powerful tool in product development. They help you visualize, refine, and perfect your equine products before production. By using mockups effectively, you can save time, money, and ensure your product meets customer expectations.`,
    image: "https://images.pexels.com/photos/1181673/pexels-photo-1181673.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    coverImage: "https://images.pexels.com/photos/1181673/pexels-photo-1181673.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    readTime: "8",
    timestamp: timestampDaysAgo() // 1 second ago
  },
  {
    id: 3,
    title: "Equine Website Design: Why Every Livery Yard and Riding School Needs a Professional Site",
    summary: "Discover why professional equine web design is essential for your horse business. Learn how a well-designed website can help livery yards, riding schools, and equine professionals grow their business.",
    content: `# Equine Website Design: Why Every Livery Yard and Riding School Needs a Professional Site

In today's digital world, a professional website is essential for any equine business. Whether you run a livery yard, riding school, or offer equine services, a well-designed website can help you attract more clients and grow your business.

## Why You Need a Professional Website

1. **First Impressions Matter**
   - 94% of first impressions are design-related
   - Professional design builds trust
   - Good design reflects your business quality

2. **24/7 Business Presence**
   - Always available to potential clients
   - Showcase your facilities and services
   - Share important information

3. **Competitive Advantage**
   - Stand out from competitors
   - Show your professionalism
   - Demonstrate your expertise

## Key Features for Equine Websites

### Essential Pages
- Home page
- About us
- Services
- Facilities
- Contact
- Gallery

### Important Elements
- High-quality images
- Clear navigation
- Mobile responsiveness
- Contact forms
- Social media links

## Design Considerations

### Visual Appeal
- Professional photography
- Consistent branding
- Clean layout
- Easy readability

### User Experience
- Simple navigation
- Fast loading
- Mobile-friendly
- Clear calls-to-action

## Content Strategy

### What to Include
- Business information
- Services offered
- Pricing (if applicable)
- Testimonials
- Blog/news section

### Writing Tips
- Clear and concise
- Professional tone
- SEO-friendly
- Regular updates

## Technical Requirements

### Must-Have Features
- Responsive design
- Fast loading
- SEO optimization
- Security features
- Analytics tracking

### Optional Features
- Online booking
- Payment processing
- Member area
- Newsletter signup
- Social media integration

## Maintenance Tips

### Regular Updates
- Fresh content
- New images
- Updated information
- Blog posts

### Technical Maintenance
- Security updates
- Performance checks
- Backup systems
- Mobile testing

## Common Mistakes to Avoid

1. **Poor Design**
   - Cluttered layout
   - Difficult navigation
   - Slow loading
   - Unprofessional look

2. **Missing Information**
   - No contact details
   - Unclear services
   - Outdated content
   - Broken links

3. **Technical Issues**
   - Not mobile-friendly
   - Poor SEO
   - Security vulnerabilities
   - Slow performance

## Getting Started

1. **Plan Your Site**
   - Define goals
   - Identify audience
   - Plan content
   - Choose features

2. **Choose a Developer**
   - Check portfolio
   - Read reviews
   - Compare prices
   - Discuss needs

3. **Launch and Maintain**
   - Test thoroughly
   - Monitor performance
   - Update regularly
   - Gather feedback

## Conclusion

A professional website is an investment that pays off through increased visibility, credibility, and client engagement. It's an essential tool for growing your equestrian business in today's digital world.`,
    image: "https://images.pexels.com/photos/15923755/pexels-photo-15923755/free-photo-of-mouth-of-a-horse-standing-in-a-paddock.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    coverImage: "https://images.pexels.com/photos/15923755/pexels-photo-15923755/free-photo-of-mouth-of-a-horse-standing-in-a-paddock.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    readTime: "3",
    timestamp: timestampDaysAgo() // 1 second ago
  },
  {
    id: 4,
    title: "Branding for Equestrian Businesses What It Is and Why It Matters",
    summary: "Understand equestrian branding for UK-based businesses. From saddle fitters to riding schools, learn how good branding builds trust and recognition.",
    content: `Branding is more than just a logo. For horse businesses, it's about building trust, consistency, and a clear identity across everything you do.

---

## Branding Helps People Understand You

Your brand should reflect your tone, values, and style — whether you're laid-back and local or sharp and professional. It communicates your unique selling points.

## Beyond the Logo

A strong equestrian brand is a complete package:

### Key Brand Elements:
- **Logo:** The visual cornerstone.
- **Colours:** Evoke specific feelings and associations.
- **Fonts:** Contribute to the overall tone (e.g., traditional serif vs. modern sans-serif).
- **Tone of Voice:** How you communicate in writing (e.g., formal, friendly, expert).
- **Imagery:** The style of photos and graphics you use.

## Consistency Builds Recognition

When your website, social media profiles, print materials, and even stable signage all align visually and tonally, you look organised, professional, and dependable. This builds trust over time.

## Keep It Authentic

Horse people can often spot when something feels inauthentic. Your branding should feel real — like it comes from someone who genuinely understands early starts, muddy boots, and quiet moments in the stable. Don't try to be something you're not.

---

Your brand doesn't need to be fancy or expensive. It just needs to be consistently and authentically yours.`,
    image: "https://cdn.pixabay.com/photo/2018/05/18/15/30/web-design-3411373_1280.jpg",
    coverImage: "https://cdn.pixabay.com/photo/2018/05/18/15/30/web-design-3411373_1280.jpg",
    readTime: "3",
    timestamp: randomTimestampLast() // 1 second ago
  },
  {
    id: 5,
    title: "Equinology is Expanding to More Industries",
    summary: "Discover how Equinology is broadening its expertise beyond equestrian businesses to help more industries with their digital transformation and branding needs.",
    content: `# Equinology is Expanding to More Industries

We're excited to announce that Equinology is expanding our services beyond the equestrian world to help more businesses achieve their digital potential. While our roots remain firmly in the equestrian industry, we're now bringing our expertise in web design, branding, and digital solutions to a wider range of sectors.

## Why We're Expanding

Our journey in the equestrian industry has taught us valuable lessons about:
- Building strong, memorable brands
- Creating user-friendly digital experiences
- Developing effective online strategies
- Crafting compelling visual identities

These principles are universal, and we're now applying them to help businesses across different industries.

## New Industries We're Serving

### Animal Care & Veterinary
- Veterinary clinics and practices
- Pet care services and grooming
- Animal shelters and rescue centres
- Pet product retailers

### Agriculture & Rural Businesses
- Farm and agricultural enterprises
- Rural tourism and accommodation
- Farm-to-table businesses
- Agricultural equipment suppliers

### Outdoor & Adventure
- Adventure tourism companies
- Outdoor equipment retailers
- Activity centres and clubs
- Nature-based tourism

### Professional Services
- Legal and financial services
- Consulting firms
- Educational institutions
- Healthcare providers

### Retail & E-commerce
- Specialty retail stores
- Online marketplaces
- Boutique businesses
- Service-based retailers

### Hospitality & Tourism
- Hotels and accommodations
- Restaurants and cafes
- Travel agencies
- Event venues

## What Stays the Same

While we're expanding our reach, our core values remain unchanged:
- Commitment to quality and excellence
- Focus on user experience
- Attention to detail
- Personalised service
- Results-driven approach

## Our Promise to New Clients

We bring the same level of dedication and expertise that has made us successful in the equestrian industry to every new sector we serve. Each industry has its unique challenges and requirements, and we're committed to understanding these nuances to deliver the best possible solutions.

---

Interested in learning more about how we can help your business? [Contact us](/contact) to discuss your digital needs.`,
    image: "https://images.pexels.com/photos/2047905/pexels-photo-2047905.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    coverImage: "https://images.pexels.com/photos/2047905/pexels-photo-2047905.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    readTime: "4",
    timestamp: randomTimestampLast() // 1 second ago
  },
  {
    id: 6,
    title: "The Importance of Responsive Web Design in 2025",
    summary: "Learn why responsive web design is crucial for modern businesses. Discover how mobile-first design can improve user experience, boost SEO rankings, and increase conversions.",
    content: `# The Importance of Responsive Web Design in 2025

In today's digital landscape, having a website that works seamlessly across all devices isn't just nice to have—it's essential. With mobile traffic accounting for over 60% of web browsing, responsive web design has become a critical factor in business success.

## What is Responsive Web Design?

Responsive web design is an approach that ensures your website looks and functions perfectly on any device, whether it's a desktop computer, tablet, or smartphone. The layout automatically adjusts to provide an optimal viewing experience across different screen sizes.

### Key Features of Responsive Design:
- **Flexible grid layouts** that adapt to screen size
- **Scalable images** that resize appropriately
- **Touch-friendly navigation** for mobile users
- **Readable text** without zooming required
- **Fast loading times** across all devices

## Why Responsive Design Matters

### 1. Mobile Usage Dominance
- Over 60% of web traffic comes from mobile devices
- Users expect seamless mobile experiences
- Poor mobile experience leads to immediate bounce

### 2. Google's Mobile-First Indexing
- Google primarily uses mobile version for ranking
- Mobile-friendly sites rank higher in search results
- Non-responsive sites are penalized in mobile searches

### 3. Improved User Experience
- Consistent experience across all devices
- Reduced bounce rates
- Increased time spent on site
- Higher conversion rates

### 4. Cost-Effective Solution
- One website works for all devices
- Reduced development and maintenance costs
- Single content management system
- Unified analytics and tracking

## Essential Elements of Responsive Design

### Flexible Grid System
Use percentage-based widths instead of fixed pixels to create layouts that adapt to any screen size.

### Breakpoints
Define specific screen sizes where your design changes to accommodate different devices:
- Mobile: 320px - 768px
- Tablet: 768px - 1024px
- Desktop: 1024px and above

### Optimized Images
Implement responsive images that load appropriate sizes based on device capabilities and screen resolution.

### Touch-Friendly Navigation
Design navigation menus that work well with touch interactions, including:
- Larger tap targets
- Simplified menu structures
- Easy-to-use hamburger menus

## Best Practices for 2025

### 1. Mobile-First Approach
Start designing for mobile devices first, then scale up to larger screens. This ensures your core content and functionality work on the most constrained devices.

### 2. Performance Optimization
- Optimize images for different screen densities
- Minimize HTTP requests
- Use efficient CSS and JavaScript
- Implement lazy loading for images

### 3. Accessibility Considerations
- Ensure text is readable on all devices
- Provide adequate contrast ratios
- Make interactive elements large enough for touch
- Support keyboard navigation

### 4. Testing Across Devices
- Test on real devices, not just browser tools
- Check performance on slower connections
- Verify functionality across different browsers
- Test with various screen orientations

## Common Responsive Design Mistakes

### 1. Ignoring Load Times
Heavy images and complex layouts can slow down mobile performance significantly.

### 2. Poor Touch Targets
Buttons and links that are too small or close together create frustrating user experiences.

### 3. Hidden Content
Hiding important content on mobile devices can hurt both user experience and SEO.

### 4. Inconsistent Branding
Maintaining brand consistency across all device sizes is crucial for recognition and trust.

## The Business Impact

### Increased Conversions
Responsive websites typically see:
- 15% higher conversion rates
- 20% more time spent on site
- 35% lower bounce rates

### Better SEO Performance
- Higher search engine rankings
- Improved local search visibility
- Better user engagement metrics

### Enhanced Brand Reputation
- Professional appearance across devices
- Consistent user experience
- Increased customer trust

## Getting Started with Responsive Design

### 1. Audit Your Current Site
- Test your website on various devices
- Identify problem areas and pain points
- Analyze your mobile traffic and behavior

### 2. Plan Your Approach
- Define your target devices and breakpoints
- Prioritize content and functionality
- Create wireframes for different screen sizes

### 3. Implement Best Practices
- Use a mobile-first approach
- Optimize for performance
- Test thoroughly across devices

### 4. Monitor and Improve
- Track mobile analytics
- Gather user feedback
- Continuously optimize performance

## Conclusion

Responsive web design is no longer optional—it's a fundamental requirement for any business that wants to succeed online. With mobile usage continuing to grow and Google's emphasis on mobile-first indexing, having a responsive website is crucial for both user experience and search engine visibility.

Investing in responsive design pays dividends through improved user engagement, higher conversion rates, and better search rankings. If your website isn't responsive yet, now is the time to make the change.

Ready to make your website responsive? Contact us to discuss how we can help transform your digital presence for the mobile-first world.`,
    image: "https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    coverImage: "https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    readTime: "7",
    timestamp: new Date('2025-06-20').getTime()
  }
];

// Seed each article with consistent timestamps
export const articles: Article[] = rawArticles.map(a => ({
  ...a,
  slug: slugify(a.title),
  author: 'Equinology Team',
})).sort((a, b) => b.timestamp - a.timestamp); 