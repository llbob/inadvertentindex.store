import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPage } from "../../lib/api";
import Container from "../_components/container";
import Header from "../_components/header";
import { PostBody } from "../_components/post-body";
import markdownToHtml from "../../lib/markdownToHtml";
import { HeroPost } from "@/app/_components/hero-post";
import { Intro } from "@/app/_components/intro";
import { MoreStories } from "@/app/_components/more-stories";
import { getAllPosts } from "../../lib/api";

export default async function Archive() {
  const page = getPage("archive");

  if (!page) {
    return notFound();
  }

  const content = await markdownToHtml(page.content || "");

  const allPosts = getAllPosts();

  const heroPost = allPosts[0];

  const morePosts = allPosts.slice(1);
  
  return (
    <main>
      <Container>
        <Header text="" />
        <article className="mb-8">
          <div className="max-w-2xl mx-auto">
            <h1 className="text-2xl md:text-4xl tracking-tighter leading-tight mb-0">
              {page.title}
            </h1>

            <div className="mb-8 text-lg">
              <PostBody content={content} />
            </div>

            {/* Posts section with similar styling to info blocks */}
            <div className="mt-6 space-y-6">
              {heroPost && (
                <div className="prose">
                  <p className="mb-4"><span className="mr-2">﹂</span>Featured</p>
                  <HeroPost
                    title={heroPost.title}
                    coverImage={heroPost.coverImage}
                    date={heroPost.date}
                    author={heroPost.author}
                    slug={heroPost.slug}
                    excerpt={heroPost.excerpt}
                  />
                </div>
              )}

              {morePosts.length > 0 && (
                <div className="prose">
                  <p className="mb-4"><span className="mr-2">﹂</span>More Posts</p>
                  <MoreStories posts={morePosts} />
                </div>
              )}
            </div>
          </div>
        </article>
      </Container>
    </main>
  );
}

export function generateMetadata(): Metadata {
  const page = getPage("archive");

  if (!page) {
    return notFound();
  }

  const title = `${page.title} | Archive`;

  return {
    title,
  };
}