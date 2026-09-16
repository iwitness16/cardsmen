import Image from 'next/image'
import { Footer, PageHeader, SiteHeader } from '@/components/site-shell'

const posts = [
  {
    slug: 'avoid-getting-scammed',
    image: 'michigan',
    title: 'Buying Scannable IDs: How to Avoid Getting Scammed',
    date: 'March 3, 2022',
    tags: ['buy fake id michigan', 'fake id maker michigan', 'fake id michigan', 'michigan fake id'],
    excerpt:
      'A fake ID is an identification that has been created or altered to represent someone other than the person who owns it. Michigan fake IDs are often used by underage people who want to buy alcohol or get into clubs, but they can also be used for more serious purposes. There are...',
  },
  {
    slug: 'how-to-buy-a-fake-id',
    image: 'newyork',
    title: 'How to Buy a Scannable ID: A Comprehensive Guide',
    date: 'March 3, 2022',
    tags: ['buy fake id new york', 'fake id maker new york', 'fake id new york', 'new york fake id'],
    excerpt:
      "It's no secret that young adults like to drink. And while many are of legal drinking age, some still want to purchase without ID. For those people, a New York scannable ID is a solution. But with so many scams and shady businesses out there, it can be hard to know where to buy...",
  },
  {
    slug: 'essential-questions-georgia',
    image: 'georgia',
    title: 'Essential Questions to Ask for the Best ID Purchasing Experience',
    date: 'March 3, 2022',
    tags: ['buy fake id georgia', 'fake id georgia', 'fake id maker georgia', 'georgia fake id'],
    excerpt:
      'When it comes to obtaining a Georgia scannable ID, you need to ask a few essential questions to ensure a positive purchasing experience. You can avoid being scammed or receiving an ID that does not scan by asking the right questions. Here are the top questions to ask when buying...',
  },
  {
    slug: 'types-of-fake-ids-florida',
    image: 'florida',
    title: 'Different Types of Scannable IDs Available on the Market',
    date: 'March 3, 2022',
    tags: ['buy fake id', 'buy fake id florida', 'fake id florida', 'fake id maker florida', 'florida fake id'],
    excerpt:
      'In recent years, the number of people trying to buy a Florida scannable ID has increased significantly. Whatever your reason, it is important to be aware of the different types available and how to choose a quality provider that actually delivers...',
  },
  {
    slug: 'tips-buying-fake-id-california',
    image: 'california',
    title: 'Tips and Tricks on Buying Scannable Identification',
    date: 'March 3, 2022',
    tags: ['buy fake id california', 'california fake id', 'fake id california', 'fake id maker california'],
    excerpt:
      "Looking to buy a California scannable ID? Whether it is for a party, a bar, or general convenience, this guide will provide tips and tricks on how to find a reputable provider and get the best deal. We will also cover what to watch out for...",
  },
  {
    slug: 'common-mistakes-fake-id',
    image: 'texas',
    title: 'Common Mistakes People Make When Buying IDs — How to Avoid Them',
    date: 'March 3, 2022',
    tags: ['buy fake id texas', 'fake id texas', 'fake id maker texas', 'texas fake id'],
    excerpt:
      "Buying a scannable ID can be a tricky process. There are many things to consider, and it is easy to make mistakes. This post covers the most common mistakes people make and gives you tips on how to avoid them...",
  },
]

export default function BlogPage() {
  return (
    <>
      <SiteHeader active="Blog" />
      <main>
        <PageHeader title="BLOG" />

        <div className="blog-page shell">
          <div className="blog-list">
            {posts.map((post) => (
              <article className="blog-card" key={post.slug}>
                <div style={{ position: 'relative', minHeight: '200px', flexShrink: 0 }}>
                  <Image
                    src={`/images/${post.image}.jpg`}
                    alt={post.title}
                    width={260}
                    height={200}
                    style={{ width: '260px', height: '100%', minHeight: '200px', objectFit: 'cover', display: 'block' }}
                  />
                </div>
                <div className="blog-card-body">
                  <h3>{post.title}</h3>
                  <div className="blog-meta">
                    <span>✏️ By CardsMen</span>
                    <span> | </span>
                    <span>📅 {post.date}</span>
                  </div>
                  <p className="blog-tags">🏷️ {post.tags.join(', ')}</p>
                  <p>{post.excerpt}</p>
                  <a href={`/blog/${post.slug}`} className="btn-read-more">
                    READ MORE »
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
