'use client';

import React, { useState } from 'react';
import { useStore } from '@/lib/store/useStore';
import { useTranslation } from '@/lib/i18n/translations';
import { 
  ThumbsUp, 
  MessageCircle, 
  Share2, 
  ExternalLink, 
  CheckCircle2, 
  Sparkles, 
  Heart,
  Calendar,
  Image as ImageIcon,
  Send,
  Bookmark
} from 'lucide-react';

export default function FacebookCommunitySection() {
  const { siteSettings, language } = useStore();
  const t = useTranslation(language);

  const fbUrl = siteSettings.social_links?.facebook || 'https://facebook.com/bluebellresort';

  const [postLikes, setPostLikes] = useState<{ [key: string]: number }>({
    'fb-post-1': 342,
    'fb-post-2': 518,
    'fb-post-3': 287,
  });

  const [likedPosts, setLikedPosts] = useState<{ [key: string]: boolean }>({});

  const handleLike = (postId: string) => {
    setLikedPosts((prev) => {
      const isLiked = !prev[postId];
      setPostLikes((likes) => ({
        ...likes,
        [postId]: isLiked ? likes[postId] + 1 : likes[postId] - 1,
      }));
      return { ...prev, [postId]: isLiked };
    });
  };

  const facebookPosts = [
    {
      id: 'fb-post-1',
      date: '2 hours ago',
      content: language === 'bn' 
        ? '🌊 পতেঙ্গা উপকূলের মনোরম সূর্যাস্ত এবং ব্লু বেল রিসোর্টের রাজকীয় আতিথেয়তা! এই উইকএন্ডে ফ্যামিলি সুইট বুকিংয়ে পাচ্ছেন বিশেষ ১৫% ছাড়। বুকিং ও বিস্তারিত জানতে মেসেজ করুন।'
        : '🌊 Experience the breathtaking coastal sunset of Patenga paired with royal hospitality at Blue Bell Resort! Enjoy 15% off Family Suites this weekend. Message us to reserve.',
      image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&auto=format&fit=crop&q=75',
      tag: '#BlueBellResort #ChattogramTourism #CoastalLuxury',
      comments: 48,
      shares: 26,
    },
    {
      id: 'fb-post-2',
      date: 'Yesterday at 4:30 PM',
      content: language === 'bn'
        ? '🚗 আমাদের এক্সিকিউটিভ রেন্ট-এ-কার এবং শাহ আমানত বিমানবন্দর পিকআপ সার্ভিস এখন ২৪/৭ যেকোনো অতিথির জন্য প্রস্তুত। প্রিমিয়াম সেডান ও মাইক্রোবাসের নিশ্চিন্ত সেবা।'
        : '🚗 Our Executive Chauffeur Car Rental and Shah Amanat Airport Pickup service is available 24/7. Travel across Chattogram in utmost safety and comfort.',
      image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=800&auto=format&fit=crop&q=75',
      tag: '#ChauffeurFleet #RentACarChittagong #ExecutiveTravel',
      comments: 62,
      shares: 39,
    },
    {
      id: 'fb-post-3',
      date: '3 days ago',
      content: language === 'bn'
        ? '🍽️ কোস্টাল সীফুড নাইট এবং লাইভ বারবিকিউ ডিনার আয়োজন! চট্টগ্রামের সেরা সি-ভিউ রেস্টুরেন্টে আপনার প্রিয়জনকে নিয়ে কাটান এক অবিস্মরণীয় সন্ধ্যা।'
        : '🍽️ Fresh Coastal Seafood & Live BBQ Evening! Savor handcrafted gourmet dining with sweeping ocean breezes at Blue Bell Resort’s signature restaurant.',
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&auto=format&fit=crop&q=75',
      tag: '#FineDining #LiveBBQ #ChattogramEats',
      comments: 35,
      shares: 19,
    },
  ];

  return (
    <section className="py-20 px-6 bg-gradient-to-b from-[#F0F4FA] via-white to-resort-sand/40 relative overflow-hidden">
      {/* Decorative Brand Accent Background */}
      <div className="absolute -top-24 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 left-0 w-96 h-96 bg-resort-gold/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-12 relative z-10">
        
        {/* Section Header with Facebook Official Branding */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-slate-200">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1877F2]/10 border border-[#1877F2]/30 text-[#1877F2] text-xs font-bold uppercase tracking-wider">
              {/* Facebook Icon SVG */}
              <svg className="w-4 h-4 fill-[#1877F2]" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              <span>Official Facebook Community</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-resort-navy">
              {language === 'bn' ? 'ফেসবুকে আমাদের সাথে যুক্ত থাকুন' : 'Join Our Facebook Community'}
            </h2>

            <p className="text-sm text-slate-600 font-light leading-relaxed">
              {language === 'bn'
                ? 'চট্টগ্রামের ব্লু বেল রিসোর্টের অফিসিয়াল ফেসবুক পেজে প্রতিদিনের অফার, ভিডিও ট্যুর ও অতিথিদের অভিজ্ঞতা জানতে যুক্ত হোন।'
                : 'Follow our official Facebook page for live beach updates, seasonal discounts, weekend packages, and guest spotlights.'}
            </p>
          </div>

          {/* Direct CTA to Official Page */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <a
              href={fbUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 bg-[#1877F2] hover:bg-[#166fe5] text-white text-xs uppercase tracking-widest font-bold rounded-2xl shadow-lg shadow-[#1877F2]/25 hover:shadow-xl transition-all duration-300 hover:scale-[1.02] active:scale-95"
            >
              <svg className="w-5 h-5 fill-white" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              <span>Follow on Facebook</span>
              <ExternalLink className="w-4 h-4 text-white/80" />
            </a>

            <div className="flex items-center gap-2 bg-white px-4 py-3 rounded-2xl border border-slate-200 shadow-sm">
              <div className="flex -space-x-2 overflow-hidden">
                <img className="inline-block h-7 w-7 rounded-full ring-2 ring-white object-cover" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=70" alt="Follower" />
                <img className="inline-block h-7 w-7 rounded-full ring-2 ring-white object-cover" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=70" alt="Follower" />
                <img className="inline-block h-7 w-7 rounded-full ring-2 ring-white object-cover" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=70" alt="Follower" />
              </div>
              <span className="text-xs font-bold text-slate-700 font-mono">12.4K+ Followers</span>
            </div>
          </div>
        </div>

        {/* Facebook Feed Showcase Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {facebookPosts.map((post) => {
            const isLiked = likedPosts[post.id];
            const currentLikes = postLikes[post.id];

            return (
              <div 
                key={post.id}
                className="bg-white rounded-3xl border border-slate-200/90 shadow-card hover:shadow-elevated transition-all duration-300 flex flex-col justify-between overflow-hidden group"
              >
                {/* Post Author Header */}
                <div className="p-5 pb-3 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-full p-0.5 bg-gradient-to-tr from-[#1877F2] to-resort-navy">
                      <img 
                        src="/logo.png" 
                        alt="Blue Bell Resort" 
                        className="w-full h-full rounded-full bg-white object-contain p-1"
                      />
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h4 className="font-serif font-bold text-slate-900 text-sm">
                          Blue Bell Resort
                        </h4>
                        <CheckCircle2 className="w-4 h-4 text-[#1877F2] fill-[#1877F2] text-white" />
                      </div>
                      <span className="text-[11px] text-slate-400 block">{post.date}</span>
                    </div>
                  </div>

                  <a 
                    href={fbUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-[#1877F2] transition-colors"
                    aria-label="View on Facebook"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>

                {/* Post Text */}
                <div className="px-5 py-2 space-y-2">
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                    {post.content}
                  </p>
                  <span className="text-[11px] text-[#1877F2] font-semibold block">
                    {post.tag}
                  </span>
                </div>

                {/* Post Image Banner */}
                <div className="mt-3 relative h-56 sm:h-60 w-full overflow-hidden bg-slate-100">
                  <img 
                    src={post.image} 
                    alt="Blue Bell Resort Facebook Post" 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
                    <ImageIcon className="w-3 h-3" />
                    <span>Official Photo</span>
                  </div>
                </div>

                {/* Post Reactions Stats */}
                <div className="px-5 py-3 border-b border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                  <div className="flex items-center gap-1.5">
                    <span className="w-4 h-4 rounded-full bg-[#1877F2] flex items-center justify-center text-white">
                      <ThumbsUp className="w-2.5 h-2.5 fill-white" />
                    </span>
                    <span className="w-4 h-4 rounded-full bg-rose-500 flex items-center justify-center text-white -ml-2">
                      <Heart className="w-2.5 h-2.5 fill-white" />
                    </span>
                    <span className="font-semibold text-slate-700 ml-1">{currentLikes}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span>{post.comments} comments</span>
                    <span>{post.shares} shares</span>
                  </div>
                </div>

                {/* Post Interactive Buttons */}
                <div className="p-3 grid grid-cols-3 gap-1 text-xs font-semibold text-slate-600 bg-slate-50/70">
                  <button 
                    onClick={() => handleLike(post.id)}
                    className={`py-2 rounded-xl flex items-center justify-center gap-1.5 transition-colors ${
                      isLiked 
                        ? 'text-[#1877F2] bg-[#1877F2]/10 font-bold' 
                        : 'hover:bg-slate-200/70 text-slate-700'
                    }`}
                  >
                    <ThumbsUp className={`w-4 h-4 ${isLiked ? 'fill-[#1877F2]' : ''}`} />
                    <span>{isLiked ? 'Liked' : 'Like'}</span>
                  </button>

                  <a 
                    href={fbUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-2 rounded-xl flex items-center justify-center gap-1.5 hover:bg-slate-200/70 text-slate-700 transition-colors"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Comment</span>
                  </a>

                  <a 
                    href={fbUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-2 rounded-xl flex items-center justify-center gap-1.5 hover:bg-slate-200/70 text-slate-700 transition-colors"
                  >
                    <Share2 className="w-4 h-4" />
                    <span>Share</span>
                  </a>
                </div>

              </div>
            );
          })}
        </div>

        {/* Bottom Banner */}
        <div className="bg-resort-navy rounded-3xl p-8 sm:p-10 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl border border-resort-gold/30">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white">
              {language === 'bn' ? 'ফেসবুকে সরাসরি মেসেজ করুন' : 'Send Us a Direct Message on Facebook'}
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 font-light">
              {language === 'bn' 
                ? 'রুম বুকিং, পিকআপ সার্ভিস বা ইভেন্ট হলের ব্যাপারে তাৎক্ষণিক উত্তর পান।' 
                : 'Get instant answers about room availability, airport pickups, and event hosting.'}
            </p>
          </div>

          <a
            href={fbUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 bg-resort-gold hover:bg-resort-goldDark text-resort-navy font-bold text-xs uppercase tracking-widest rounded-2xl shadow-gold hover:shadow-elevated transition-all duration-300 flex items-center gap-2 hover:scale-105 shrink-0"
          >
            <span>Open Facebook Page</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>

      </div>
    </section>
  );
}
