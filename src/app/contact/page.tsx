import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPage } from "../../lib/api";
import Container from "../_components/container";
import Header from "../_components/header";
import { PostBody } from "../_components/post-body";
import markdownToHtml from "../../lib/markdownToHtml";

export default async function Contact() {
  const page = getPage("contact");

  if (!page) {
    return notFound();
  }

  const content = await markdownToHtml(page.content || "");

  return (
    <main>
      <Container>
        <Header />
        <article className="mb-32">
          <h1 className="text-4xl font-bold mb-8">{page.title}</h1>
          <PostBody content={content} />
        </article>
      </Container>
    </main>
  );
}

export function generateMetadata(): Metadata {
  const page = getPage("contact");

  if (!page) {
    return notFound();
  }

  const title = `${page.title} | Contact`;

  return {
    title,
  };
}