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
  const creditsContent = page.creditsText ? await markdownToHtml(page.creditsText) : "";

  return (
    <main className="h-screen flex flex-col">
      <Container>
        <Header text="" />
        
        {/* Centered content container that transitions when text appears */}
        <div className="flex-1 flex flex-col justify-center items-center text-center animate-[centerToTop_1s_ease-in-out_3s_forwards]">
          
          {page.title && (<h1 className="text-2xl md:text-4xl tracking-tighter leading-tight mb-4">
            {page.title}
          </h1>)}

          {(page.releaseCode || page.duration) && (
            <div className="text-base mb-4">
              {page.releaseCode && <p>{page.releaseCode}</p>}
              {page.duration && <p>{page.duration}</p>}
            </div>
          )}

          {page.coverVideo && (
            <div className="w-full max-w-2xl">
              <video
                src={page.coverVideo}
                className="w-full h-auto rounded-lg"
                loop
                autoPlay
                muted
                playsInline
              />
            </div>
          )}
        </div>

        {/* Fade in content */}
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
            creditsContent={creditsContent}
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