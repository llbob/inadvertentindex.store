import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getIndexPage } from "../lib/api";
import Container from "@/app/_components/container";
import Image from "next/image";
import { PostBody } from "@/app/_components/post-body";
import markdownToHtml from "@/lib/markdownToHtml";
import Header from "@/app/_components/header";
import { ArrowRight } from "lucide-react";
import FadeInContent from "@/app/_components/fade-in-content";

export default async function Index() {
  const page = getIndexPage();

  if (!page) {
    return notFound();
  }

  const content = await markdownToHtml(page.content || "");
  const introContent = page.introText ? await markdownToHtml(page.introText) : "";
  const proceedsContent = page.proceedsText ? await markdownToHtml(page.proceedsText) : "";
  return (
    <main className="min-h-screen flex flex-col">
      <Container>
        <Header text="" />
      </Container>
      
      {/* Video container that stays centered until content fades in */}
      <div className="flex-1 flex items-center justify-center px-4">
        <div className="text-center animate-[centerToTop_1s_ease-in-out_3s_forwards]">
          {page.coverVideo && (
            <div className="w-full max-w-2xl">
              <video
                src={page.coverVideo}
                poster={page.videoPoster}
                className="w-full h-auto"
                loop
                autoPlay
                muted
                playsInline
              />
            </div>
          )}
        </div>
      </div>

      {/* Fade in content */}
      <Container>
        <div className="max-w-2xl mx-auto mt-8">
          <FadeInContent
            introContent={introContent}
            infoBlock1={page.infoBlock1}
            infoBlock2={page.infoBlock2}
            infoBlock3={page.infoBlock3}
            proceedsContent={proceedsContent}
            buyButtonText={page.buyButtonText}
            buyButtonLink={page.buyButtonLink}
            price={page.price}
            content={content}
            creditsText={page.creditsText}
            copyrightBody={page.copyrightBody}
            copyrightEndText={page.copyrightEndText}
          />
        </div>
      </Container>
    </main>
  );
}

export function generateMetadata(): Metadata {
  const page = getIndexPage();

  if (!page) {
    return notFound();
  }

  const title = `${page.title}`;

  return {
    title,
  };
}