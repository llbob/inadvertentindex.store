import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllPosts, getPostBySlug } from "../../../lib/api";
import { CMS_NAME } from "../../../lib/constants";
import markdownToHtml from "../../../lib/markdownToHtml";
import Container from "../../_components/container";
import Header from "../../_components/header";
import { PostBody } from "../../_components/post-body";
import CoverImage from "../../_components/cover-image";
import DateFormatter from "../../_components/date-formatter";

export default async function Post({ params }: Params) {
  const post = getPostBySlug(params.slug);

  if (!post) {
    return notFound();
  }

  const content = await markdownToHtml(post.content || "");

  return (
    <main>
      <Container>
        <Header text="" />
        <article className="mb-8">
          <div className="max-w-2xl mx-auto">
            <h1 className="text-2xl md:text-4xl tracking-tighter leading-tight mb-2">
              {post.title}
            </h1>
            <div className="text-base mb-4">
              <p><DateFormatter dateString={post.date} /></p>
              <p>By {post.author.name}</p>
            </div>

            {post.coverImage && (
              <div className="mb-8 md:mb-16 sm:mx-0">
                <CoverImage title={post.title} src={post.coverImage} />
              </div>
            )}

            <div className="mb-8 text-lg">
              <PostBody content={content} />
            </div>
          </div>
        </article>
      </Container>
    </main>
  );
}

type Params = {
  params: {
    slug: string;
  };
};

export function generateMetadata({ params }: Params): Metadata {
  const post = getPostBySlug(params.slug);

  if (!post) {
    return notFound();
  }

  const title = `${post.title} | Posts ${CMS_NAME}`;

  return {
    openGraph: {
      title,
      images: [post.ogImage.url],
    },
  };
}

export async function generateStaticParams() {
  const posts = getAllPosts();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}
