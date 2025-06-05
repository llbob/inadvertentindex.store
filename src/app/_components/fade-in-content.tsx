'use client';

import { useState, useEffect } from 'react';
import { PostBody } from './post-body';
import { ArrowRight } from 'lucide-react';

interface FadeInContentProps {
    introContent: string;
    infoBlock1?: string;
    infoBlock2?: string;
    infoBlock3?: string;
    proceedsContent: string;
    buyButtonText?: string;
    buyButtonLink?: string;
    price?: string;
    content: string;
    creditsContent: string;
    copyrightBody?: string;
    copyrightEndText?: string;
}

export default function FadeInContent({
    introContent,
    infoBlock1,
    infoBlock2,
    infoBlock3,
    proceedsContent,
    buyButtonText,
    buyButtonLink,
    price,
    content,
    creditsContent,
    copyrightBody,
    copyrightEndText,
}: FadeInContentProps) {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(true);
            
            // Force Lemon Squeezy to re-scan for new buttons after they appear
            setTimeout(() => {
                if (typeof window !== 'undefined' && (window as any).createLemonSqueezy) {
                    // Re-initialize all Lemon Squeezy buttons
                    const buttons = document.querySelectorAll('.lemonsqueezy-button');
                    buttons.forEach((button) => {
                        (window as any).createLemonSqueezy();
                    });
                } else if (typeof window !== 'undefined' && (window as any).LemonSqueezy) {
                    // Alternative method - refresh the Lemon Squeezy setup
                    (window as any).LemonSqueezy.Setup({
                        eventHandler: (event: any) => {
                            // Handle Lemon Squeezy events if needed
                        }
                    });
                    // Force refresh
                    (window as any).LemonSqueezy.Refresh();
                }
            }, 1500); // Wait for fade-in animation to complete
        }, 3000);

        return () => clearTimeout(timer);
    }, []);

    if (!isVisible) {
        return null;
    }

    return (
        <div className="mb-8 opacity-0 animate-[fadeInSimple_1s_ease-in-out_forwards]">
            <div className="mb-8 text-lg">
                {introContent && (
                    <div className="mb-6 text-foreground">
                        <PostBody content={introContent} />
                    </div>
                )}

                <div className="mt-6 space-y-6">
                    {infoBlock1 && (
                        <div className="prose">
                            <p><span className="mr-2">﹂</span>{infoBlock1}</p>
                        </div>
                    )}

                    {infoBlock2 && (
                        <div className="prose">
                            <p><span className="mr-2">﹂</span>{infoBlock2}</p>
                        </div>
                    )}

                    {infoBlock3 && (
                        <div className="prose">
                            <p><span className="mr-2">﹂</span>{infoBlock3}</p>
                        </div>
                    )}
                </div>

                {proceedsContent && (
                    <div className="mt-6 text-foreground">
                        <PostBody content={proceedsContent} />
                    </div>
                )}

                {buyButtonText && (
                    <div className="mt-8 flex">
                        <span className="mr-2 text-2xl">﹂</span>
                        <div className="block">
                            <a 
                                href={buyButtonLink} 
                                className="lemonsqueezy-button"
                                data-ls-checkout-url={buyButtonLink}
                            >
                                <p className="text-2xl font-bold inline-flex items-center">
                                    {buyButtonText}<ArrowRight className="w-10 h-7 mt-1" />
                                </p>
                            </a>
                            {price && (
                                <p className="text-base-text">{price}</p>
                            )}
                        </div>
                    </div>
                )}
            </div>

            <PostBody content={content} />

            {creditsContent && (
                <div className="mt-8 text-foreground">
                    <PostBody content={creditsContent} />
                </div>
            )}

            {copyrightBody && (
                <footer className="mt-2 text-xs text-center">
                    <p className="text-subtle">{copyrightBody}</p>
                    <p className="text-subtle mt-2">{copyrightEndText}</p>
                </footer>
            )}
        </div>
    );
}