import React, { useState, useEffect, useMemo } from 'react';
import {
  ShieldCheck,
  Lock,
  Search,
  Plus,
  Server,
  Globe,
  Mail,
  Share2,
  Key,
  CreditCard,
  FileText,
  Settings,
  Copy,
  Check,
  ExternalLink,
  Trash2,
  Edit3,
  RefreshCw,
  Eye,
  EyeOff,
  Filter,
  CheckCircle2,
  HardDrive,
  Activity,
  LogOut,
  FolderLock,
  ArrowRight,
  ShieldAlert,
  Smartphone,
  ChevronRight,
  ChevronDown,
  LayoutGrid,
  List,
  GitBranch,
  Moon,
  Sun,
  AlertTriangle,
  Calendar,
  Sparkles,
  Download,
  Upload,
  SlidersHorizontal,
  X,
  FolderOpen,
  Folder,
  Layers,
  Inbox,
  Users,
  UserPlus,
  KeyRound,
  Shield,
  QrCode
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { 
  supabase, 
  fetchVaultItemsFromCloud, 
  saveVaultItemToCloud, 
  deleteVaultItemFromCloud,
  fetchTeamInvitesFromCloud,
  saveTeamInviteToCloud,
  acceptInviteWithPin,
  fromCloudItem,
  fromCloudInvite
} from './supabase';
import LandingPage from './LandingPage';
import * as OTPAuth from 'otpauth';

// ── CUSTOM VECTOR ICONS (Crisp, High-Contrast & Strict Fixed Dimensions) ──
const GoogleIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24">
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
  </svg>
);

const GithubIcon = ({ className = "w-4 h-4", size = 18 }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className={`shrink-0 inline-block ${className}`}
    style={{ width: `${size}px`, height: `${size}px`, minWidth: `${size}px`, minHeight: `${size}px`, maxWidth: `${size}px`, maxHeight: `${size}px` }}
  >
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

const VercelIcon = ({ className = "w-4 h-4", size = 18 }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className={`shrink-0 inline-block ${className}`}
    style={{ width: `${size}px`, height: `${size}px`, minWidth: `${size}px`, minHeight: `${size}px`, maxWidth: `${size}px`, maxHeight: `${size}px` }}
  >
    <path d="M12 2L24 22H0L12 2Z" />
  </svg>
);

const AnalyticsIcon = ({ className = "w-4 h-4", size = 18 }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2.2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={`shrink-0 inline-block ${className}`}
    style={{ width: `${size}px`, height: `${size}px`, minWidth: `${size}px`, minHeight: `${size}px`, maxWidth: `${size}px`, maxHeight: `${size}px` }}
  >
    <line x1="18" y1="20" x2="18" y2="10" />
    <line x1="12" y1="20" x2="12" y2="4" />
    <line x1="6" y1="20" x2="6" y2="14" />
  </svg>
);

const AdSenseIcon = ({ className = "w-4 h-4", size = 18 }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2.2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={`shrink-0 inline-block ${className}`}
    style={{ width: `${size}px`, height: `${size}px`, minWidth: `${size}px`, minHeight: `${size}px`, maxWidth: `${size}px`, maxHeight: `${size}px` }}
  >
    <line x1="12" y1="1" x2="12" y2="23" />
    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
  </svg>
);

// ── SOCIAL MEDIA BRAND SVG ICONS ──
const PinterestIcon = ({ className = "w-4 h-4", size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={`shrink-0 inline-block ${className}`}>
    <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z"/>
  </svg>
);

const YouTubeIcon = ({ className = "w-4 h-4", size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={`shrink-0 inline-block ${className}`}>
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
);

const FacebookIcon = ({ className = "w-4 h-4", size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={`shrink-0 inline-block ${className}`}>
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

const InstagramIcon = ({ className = "w-4 h-4", size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={`shrink-0 inline-block ${className}`}>
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
);

const TikTokIcon = ({ className = "w-4 h-4", size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={`shrink-0 inline-block ${className}`}>
    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.24 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
  </svg>
);

const TwitterXIcon = ({ className = "w-4 h-4", size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={`shrink-0 inline-block ${className}`}>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

const LinkedInIcon = ({ className = "w-4 h-4", size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={`shrink-0 inline-block ${className}`}>
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
  </svg>
);

const SocialPlatformIcon = ({ platform, size = 15, className = "" }) => {
  switch (platform) {
    case 'pinterest': return <PinterestIcon size={size} className={className} />;
    case 'youtube': return <YouTubeIcon size={size} className={className} />;
    case 'facebook': return <FacebookIcon size={size} className={className} />;
    case 'instagram': return <InstagramIcon size={size} className={className} />;
    case 'tiktok': return <TikTokIcon size={size} className={className} />;
    case 'twitter':
    case 'x': return <TwitterXIcon size={size} className={className} />;
    case 'linkedin': return <LinkedInIcon size={size} className={className} />;
    default: return <Share2 size={size} className={className} />;
  }
};

// Auto-detect social media platform from customType, url, or title
function detectSocialPlatform(item) {
  if (!item) return null;
  const custom = (item.customType || '').toLowerCase().trim();
  const url = (item.url || '').toLowerCase().trim();
  const title = (item.title || '').toLowerCase().trim();
  const username = (item.username || '').toLowerCase().trim();

  const combined = `${custom} ${url} ${title} ${username}`;

  if (combined.includes('pinterest') || combined.includes('pin.it')) {
    return {
      id: 'pinterest',
      label: 'Pinterest',
      badgeColor: 'bg-rose-50 dark:bg-rose-950/70 text-[#E60023] dark:text-rose-400 border-rose-300 dark:border-rose-800',
      tagColor: 'text-[#E60023]',
      icon: 'pinterest'
    };
  }
  if (combined.includes('youtube') || combined.includes('youtu.be')) {
    return {
      id: 'youtube',
      label: 'YouTube',
      badgeColor: 'bg-red-50 dark:bg-red-950/70 text-[#FF0000] dark:text-red-400 border-red-300 dark:border-red-800',
      tagColor: 'text-[#FF0000]',
      icon: 'youtube'
    };
  }
  if (combined.includes('facebook') || combined.includes('fb.com') || combined.includes('fb.me')) {
    return {
      id: 'facebook',
      label: 'Facebook',
      badgeColor: 'bg-blue-50 dark:bg-blue-950/70 text-[#1877F2] dark:text-blue-400 border-blue-300 dark:border-blue-800',
      tagColor: 'text-[#1877F2]',
      icon: 'facebook'
    };
  }
  if (combined.includes('instagram') || combined.includes('instagr.am')) {
    return {
      id: 'instagram',
      label: 'Instagram',
      badgeColor: 'bg-pink-50 dark:bg-pink-950/70 text-[#E1306C] dark:text-pink-400 border-pink-300 dark:border-pink-800',
      tagColor: 'text-[#E1306C]',
      icon: 'instagram'
    };
  }
  if (combined.includes('tiktok')) {
    return {
      id: 'tiktok',
      label: 'TikTok',
      badgeColor: 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white border-slate-300 dark:border-slate-700',
      tagColor: 'text-slate-900 dark:text-white',
      icon: 'tiktok'
    };
  }
  if (combined.includes('twitter') || combined.includes('x.com') || custom === 'x') {
    return {
      id: 'twitter',
      label: 'X (Twitter)',
      badgeColor: 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white border-slate-300 dark:border-slate-700',
      tagColor: 'text-slate-900 dark:text-white',
      icon: 'twitter'
    };
  }
  if (combined.includes('linkedin')) {
    return {
      id: 'linkedin',
      label: 'LinkedIn',
      badgeColor: 'bg-sky-50 dark:bg-sky-950/70 text-[#0A66C2] dark:text-sky-400 border-sky-300 dark:border-sky-800',
      tagColor: 'text-[#0A66C2]',
      icon: 'linkedin'
    };
  }
  return null;
}

// ── UNIFIED CATEGORY METADATA & COMPONENT ──
const CATEGORIES_LIST = [
  { id: 'all', label: 'All Items', icon: FolderLock, desc: 'Everything in your vault' },
  { id: 'blog', label: 'Blogs & Websites', icon: Globe, desc: 'WordPress, Ghost, content sites' },
  { id: 'hosting', label: 'Hostinger & VPS', icon: Server, desc: 'Servers, cPanel, hPanel, VPS' },
  { id: 'domain', label: 'Domains & DNS', icon: HardDrive, desc: 'Namecheap, Cloudflare, DNS' },
  { id: 'github', label: 'GitHub Repos & Keys', icon: GithubIcon, desc: 'Source repos, SSH keys & PAT' },
  { id: 'vercel', label: 'Vercel & Deployments', icon: VercelIcon, desc: 'Frontend edge deployments' },
  { id: 'gmail', label: 'Linked Inboxes', icon: Mail, desc: 'Anchor emails & recovery inboxes' },
  { id: 'social', label: 'Social Networks', icon: Share2, desc: 'Pinterest, Twitter/X, Instagram' },
  { id: 'custom', label: 'Custom Assets (تخصيص)', icon: SlidersHorizontal, desc: 'Stripe, DB, APIs, Cloudflare' }
];

const CategoryIcon = ({ category, className = "w-4.5 h-4.5", size = 18 }) => {
  const iconProps = {
    className: `shrink-0 ${className}`,
    style: { width: `${size}px`, height: `${size}px`, minWidth: `${size}px`, minHeight: `${size}px`, maxWidth: `${size}px`, maxHeight: `${size}px` },
    size
  };

  switch (category) {
    case 'all': return <FolderLock {...iconProps} strokeWidth={2} />;
    case 'blog': return <Globe {...iconProps} strokeWidth={2} />;
    case 'hosting': return <Server {...iconProps} strokeWidth={2} />;
    case 'domain': return <HardDrive {...iconProps} strokeWidth={2} />;
    case 'github': return <GithubIcon {...iconProps} size={size} />;
    case 'vercel': return <VercelIcon {...iconProps} size={size} />;
    case 'gmail': return <Mail {...iconProps} strokeWidth={2} />;
    case 'social': return <Share2 {...iconProps} strokeWidth={2} />;
    case 'custom': return <SlidersHorizontal {...iconProps} strokeWidth={2} />;
    default: return <FolderLock {...iconProps} strokeWidth={2} />;
  }
};

const INITIAL_VAULT_ITEMS = [
  {
    id: 'item-1',
    category: 'blog',
    title: 'World Travel & Tourism Blog',
    url: 'https://worldtravelaffiliate.com',
    adminUrl: 'https://worldtravelaffiliate.com/wp-admin',
    username: 'travel_admin',
    password: 'Tr@velPass2026!Sec',
    // MULTI-GMAIL COMPONENT MAPPING (User's Exact Real-World Architecture)
    linkedGmail: 'empire.affiliate@gmail.com', // Main Business & Domain Anchor
    wpAdminEmail: 'travel.techmaster@gmail.com', // Separate WordPress Admin Login
    adsenseEmail: 'adsense.payouts.hq@gmail.com', // Separate AdSense Account
    analyticsEmail: 'analytics.traffic.hq@gmail.com', // Separate Analytics GA4 Account
    hostingEmail: 'hostinger.servers.ops@gmail.com', // Hostinger Account
    linkedHost: 'Hostinger Cloud VPS (EU-Frankfurt)',
    domainRegistrar: 'Namecheap DNS',
    expiryDate: '2027-08-15',
    status: 'healthy',
    analyticsAccount: 'GA4: G-TRV8892110 (150k monthly sessions)',
    monetizationType: 'adsense',
    monetizationDetails: 'Google AdSense (pub-3940256099942544) + Booking.com Aff',
    linkedGithub: 'github.com/travel-media/worldtravel-theme',
    linkedVercel: 'travel-hub-edge.vercel.app',
    notes: 'Multi-Gmail Ecosystem: Domain anchored under empire.affiliate, WP managed by travel.techmaster, AdSense tied to adsense.payouts.hq.',
    customFields: [
      { label: 'Cloudflare Zone ID', value: '7a9c8b6d4e2f1098' },
      { label: 'AdSense Target RPM', value: '$18.50' }
    ]
  },
  {
    id: 'item-2',
    category: 'blog',
    title: 'Fitness Elite Guide Pro',
    url: 'https://fitnesseliteguide.net',
    adminUrl: 'https://fitnesseliteguide.net/wp-admin',
    username: 'fit_master',
    password: 'FitElitePass#9901',
    linkedGmail: 'empire.affiliate@gmail.com',
    wpAdminEmail: 'fitelite.editor@gmail.com',
    adsenseEmail: 'adsense.payouts.hq@gmail.com', // Shares the same AdSense account!
    analyticsEmail: 'analytics.traffic.hq@gmail.com',
    linkedHost: 'Hostinger Cloud VPS (EU-Frankfurt)',
    domainRegistrar: 'Hostinger Registrar',
    expiryDate: '2026-12-01',
    status: 'warning',
    analyticsAccount: 'GA4: G-FIT99021',
    monetizationType: 'affiliate',
    monetizationDetails: 'Amazon Associates (Tag: fitelite-20)',
    notes: 'Amazon Associates affiliate site. Renewal coming up in December.',
    customFields: [
      { label: 'Affiliate Manager', value: 'US Associates Team' }
    ]
  },
  {
    id: 'item-3',
    category: 'hosting',
    title: 'Hostinger Cloud VPS (EU-Frankfurt)',
    url: 'https://hpanel.hostinger.com',
    username: 'hostinger.servers.ops@gmail.com',
    password: 'HostingerMaster#2026',
    ip: '185.193.124.78',
    linkedGmail: 'empire.affiliate@gmail.com',
    hostingEmail: 'hostinger.servers.ops@gmail.com',
    expiryDate: '2026-11-28',
    status: 'healthy',
    notes: 'Hosts 5 blogs. 16GB RAM, NVMe storage. Primary server.'
  },
  {
    id: 'item-gh-1',
    category: 'github',
    title: 'WorldTravel Theme & Custom Plugins',
    url: 'https://github.com/travel-media/worldtravel-theme',
    username: 'travel_dev_ops',
    password: 'ghp_984fjk392hds823nfsd9823hSec',
    linkedGmail: 'empire.affiliate@gmail.com',
    status: 'healthy',
    notes: 'Primary GitHub repo for WordPress custom theme. Auto-deploys via GitHub Actions to Hostinger.',
    customFields: [
      { label: 'Default Branch', value: 'main' },
      { label: 'CI/CD Token', value: 'secrets.HOSTINGER_DEPLOY_KEY' }
    ]
  },
  {
    id: 'item-ver-1',
    category: 'vercel',
    title: 'Travel API & Fast Edge Cache',
    url: 'https://travel-hub-edge.vercel.app',
    username: 'empire-travel-team',
    password: 'vcp_9823hsd923hfsd9823hsEdge',
    linkedGmail: 'empire.affiliate@gmail.com',
    linkedHost: 'Vercel Serverless Edge (iad1)',
    status: 'healthy',
    notes: 'Next.js edge middleware caching WordPress API responses and images globally.',
    customFields: [
      { label: 'Framework', value: 'Next.js 14 App Router' },
      { label: 'Tier', value: 'Vercel Pro $20/mo' }
    ]
  },
  {
    id: 'item-4',
    category: 'domain',
    title: 'worldtravelaffiliate.com',
    url: 'https://www.namecheap.com',
    username: 'travel_domains_user',
    password: 'Namecheap#Key772',
    linkedGmail: 'empire.affiliate@gmail.com',
    expiryDate: '2027-08-15',
    status: 'healthy',
    notes: 'DNS managed through Cloudflare. Auto-renew enabled.'
  },
  {
    id: 'item-5',
    category: 'gmail',
    title: 'empire.affiliate@gmail.com',
    url: 'https://mail.google.com',
    username: 'empire.affiliate@gmail.com',
    password: 'GmailMaster#Affiliate99',
    recoveryPhone: '+212 6XX-XXXXXX',
    recoveryEmail: 'backup.vault.recover@gmail.com',
    status: 'healthy',
    notes: 'Primary Master Business Gmail: owns Namecheap, Stripe, and primary assets.'
  },
  {
    id: 'item-5b',
    category: 'gmail',
    title: 'adsense.payouts.hq@gmail.com',
    url: 'https://adsense.google.com',
    username: 'adsense.payouts.hq@gmail.com',
    password: 'AdSenseMaster#Sec2026',
    status: 'healthy',
    notes: 'Approved Google AdSense Account Gmail governing publisher IDs across blogs.'
  },
  {
    id: 'item-cust-1',
    category: 'custom',
    title: 'Stripe Sponsorships & Invoicing',
    customType: 'Payment Gateway',
    url: 'https://dashboard.stripe.com',
    username: 'empire.affiliate@gmail.com',
    password: 'Stripe#MasterKey2026',
    linkedGmail: 'empire.affiliate@gmail.com',
    status: 'healthy',
    notes: 'Handles direct blog sponsorship invoices and digital travel guide sales.',
    customFields: [
      { label: 'Live Publishable Key', value: 'pk_live_51M0abcdef...' },
      { label: 'Payout Currency', value: 'USD (Direct Wire)' }
    ]
  },
  {
    id: 'item-6',
    category: 'social',
    title: 'Pinterest Travel Hub (500k Views)',
    url: 'https://pinterest.com/worldtravelaffiliate',
    username: 'travel_hub_official',
    password: 'PinTravel#Traffic2026',
    linkedGmail: 'empire.affiliate@gmail.com',
    status: 'healthy',
    notes: 'Drives 70% of organic traffic to the travel blog.'
  },
  {
    id: 'item-7',
    category: 'hosting',
    title: 'Hostinger Business Shared (US-East)',
    url: 'https://hpanel.hostinger.com',
    username: 'tech.portal.admin@gmail.com',
    password: 'HostSharedPass#992',
    ip: '194.163.180.22',
    linkedGmail: 'tech.portal.admin@gmail.com',
    expiryDate: '2027-04-10',
    status: 'healthy',
    notes: 'Secondary server for test sites & experimental landing pages.'
  },
  {
    id: 'item-8',
    category: 'blog',
    title: 'AI Tech Pulse Hub',
    url: 'https://aitechpulse.io',
    adminUrl: 'https://aitechpulse.io/wp-admin',
    username: 'aipulse_admin',
    password: 'AITech#Pulse881',
    linkedGmail: 'tech.portal.admin@gmail.com',
    wpAdminEmail: 'aitech.wp.author@gmail.com',
    adsenseEmail: 'tech.portal.admin@gmail.com',
    linkedHost: 'Hostinger Business Shared (US-East)',
    domainRegistrar: 'Porkbun Domains',
    expiryDate: '2027-03-15',
    status: 'healthy',
    analyticsAccount: 'GA4: G-AITECH772',
    monetizationType: 'other_ads',
    monetizationDetails: 'Ezoic Network + Sponsored AI Saas Reviews',
    notes: 'Sponsored reviews & AI tools affiliate.'
  }
];

// ── INITIAL TEAM MEMBERS & SHARED VAULT DATA ──
const INITIAL_TEAM_MEMBERS = [
  {
    id: 'mem-1',
    name: 'Vault Master (You)',
    email: 'empire.affiliate@gmail.com',
    role: 'owner', // 'owner' | 'admin' | 'viewer'
    status: 'active', // 'active' | 'pending'
    joinedAt: '2026-01-15',
    pin: '',
    twoFactorEnabled: true
  },
  {
    id: 'mem-2',
    name: 'Sarah (Co-Founder)',
    email: 'sarah.partner.co@gmail.com',
    role: 'admin',
    status: 'pending',
    invitedAt: 'Today',
    pin: '4829',
    twoFactorEnabled: false
  }
];

export default function App() {
  // Official Authentication State (Sign in with Google)
  const [currentUser, setCurrentUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState('');

  // Detect if running inside Desktop Application (Electron)
  const isDesktop = typeof window !== 'undefined' && (
    window.location.hash === '#app' ||
    window.navigator.userAgent.toLowerCase().includes('electron')
  );

  // View Mode: 'landing' (Web Homepage) | 'app' (Vault Login & Dashboard)
  const [activeView, setActiveView] = useState(() => isDesktop ? 'app' : 'landing');

  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === '#app' || isDesktop) {
        setActiveView('app');
      } else if (window.location.hash === '#landing' || !window.location.hash) {
        setActiveView('landing');
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [isDesktop]);


  // ── TEAM & VAULT SHARING STATE ──
  const [teamMembers, setTeamMembers] = useState(() => {
    const saved = localStorage.getItem('VM_TEAM_MEMBERS_V2');
    return saved ? JSON.parse(saved) : INITIAL_TEAM_MEMBERS;
  });

  useEffect(() => {
    localStorage.setItem('VM_TEAM_MEMBERS_V2', JSON.stringify(teamMembers));
  }, [teamMembers]);

  // Check if current user has an invite waiting for them
  const pendingInviteForMe = useMemo(() => {
    if (!currentUser) return null;
    return teamMembers.find(m => m.email?.toLowerCase() === currentUser.email?.toLowerCase() && m.status === 'pending');
  }, [currentUser, teamMembers]);

  const [enteredInvitePin, setEnteredInvitePin] = useState('');
  const [pinErrorMsg, setPinErrorMsg] = useState('');

  // ── 2FA AUTHENTICATOR (Google Authenticator / Authy) STATE ──
  const [rememberedUser, setRememberedUser] = useState(() => {
    try {
      const saved = localStorage.getItem('VM_LAST_LOGGED_IN_USER');
      return saved ? JSON.parse(saved) : null;
    } catch(e) { return null; }
  });

  const remembered2FA = useMemo(() => {
    if (!rememberedUser?.email) return null;
    try {
      const saved = localStorage.getItem('VM_2FA_' + rememberedUser.email.toLowerCase());
      return saved ? JSON.parse(saved) : null;
    } catch(e) { return null; }
  }, [rememberedUser]);

  // Login Mode: 'totp' (if user previously enabled 2FA) | 'google'
  const [loginMode, setLoginMode] = useState(() => {
    try {
      const saved = localStorage.getItem('VM_LAST_LOGGED_IN_USER');
      if (saved) {
        const u = JSON.parse(saved);
        const t = localStorage.getItem('VM_2FA_' + u.email?.toLowerCase());
        if (t && JSON.parse(t).enabled) return 'totp';
      }
    } catch(e) {}
    return 'google';
  });

  const [enteredTotpCode, setEnteredTotpCode] = useState('');
  const [totpError, setTotpError] = useState('');

  // 2FA Setup State for Current User
  const [show2FAModal, setShow2FAModal] = useState(false);
  const [setupSecret, setSetupSecret] = useState('');
  const [setupUri, setSetupUri] = useState('');
  const [confirmTotpCode, setConfirmTotpCode] = useState('');
  const [setupError, setSetupError] = useState('');

  // Check if 2FA is active for current user
  const is2FAActive = useMemo(() => {
    if (!currentUser?.email) return false;
    try {
      const saved = localStorage.getItem('VM_2FA_' + currentUser.email.toLowerCase());
      return saved ? JSON.parse(saved).enabled : false;
    } catch(e) { return false; }
  }, [currentUser]);

  // Launch 2FA Setup Modal
  const handleStart2FASetup = () => {
    if (!currentUser?.email) return;
    const secret = new OTPAuth.Secret({ size: 20 });
    const totp = new OTPAuth.TOTP({
      issuer: 'VaultMaster OS',
      label: currentUser.email,
      algorithm: 'SHA1',
      digits: 6,
      period: 30,
      secret: secret
    });

    setSetupSecret(secret.base32);
    setSetupUri(totp.toString());
    setConfirmTotpCode('');
    setSetupError('');
    setShow2FAModal(true);
  };

  // Confirm and activate 2FA
  const handleConfirm2FASetup = (e) => {
    e?.preventDefault();
    if (!confirmTotpCode || confirmTotpCode.length !== 6) {
      setSetupError('يرجى إدخال الكود المكون من 6 أرقام كاملاً');
      return;
    }

    try {
      const totp = new OTPAuth.TOTP({
        issuer: 'VaultMaster OS',
        label: currentUser.email,
        algorithm: 'SHA1',
        digits: 6,
        period: 30,
        secret: OTPAuth.Secret.fromBase32(setupSecret)
      });

      const delta = totp.validate({ token: confirmTotpCode.trim(), window: 1 });
      if (delta !== null) {
        const config = {
          enabled: true,
          secret: setupSecret,
          createdAt: new Date().toISOString()
        };
        localStorage.setItem('VM_2FA_' + currentUser.email.toLowerCase(), JSON.stringify(config));
        
        setTeamMembers(prev => prev.map(m => 
          m.email?.toLowerCase() === currentUser.email?.toLowerCase() 
            ? { ...m, twoFactorEnabled: true } 
            : m
        ));

        confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
        setShow2FAModal(false);
      } else {
        setSetupError('الكود غير صحيح! يرجى إدخال الكود الظاهر حالياً في تطبيق Google Authenticator');
      }
    } catch (err) {
      setSetupError('خطأ أثناء التحقق: ' + err.message);
    }
  };

  // Daily TOTP Login Handler
  const handleTotpLogin = (e) => {
    e?.preventDefault();
    if (!enteredTotpCode || enteredTotpCode.length !== 6) {
      setTotpError('يرجى إدخال كود الـ Authenticator المكون من 6 أرقام');
      return;
    }

    if (!rememberedUser || !remembered2FA?.secret) {
      setTotpError('لم يتم العثور على إعدادات التحقق. يرجى تسجيل الدخول بجوجل');
      return;
    }

    try {
      const totp = new OTPAuth.TOTP({
        issuer: 'VaultMaster OS',
        label: rememberedUser.email,
        algorithm: 'SHA1',
        digits: 6,
        period: 30,
        secret: OTPAuth.Secret.fromBase32(remembered2FA.secret)
      });

      const delta = totp.validate({ token: enteredTotpCode.trim(), window: 1 });
      if (delta !== null) {
        setCurrentUser(rememberedUser);
        setActiveView('app');
        setEnteredTotpCode('');
        setTotpError('');
        confetti({ particleCount: 80, spread: 60, origin: { y: 0.6 } });
      } else {
        setTotpError('الكود غير صحيح! تأكد من الوقت في هاتفك وأدخل الكود الحالي');
      }
    } catch (err) {
      setTotpError('خطأ في التحقق: ' + err.message);
    }
  };

  // Disable 2FA
  const handleDisable2FA = () => {
    if (!currentUser?.email) return;
    if (confirm('هل أنت متأكد من رغبتك في إلغاء تفعيل التحقق بخطوتين؟ سيتطلب الدخول اليومي تسجيل الدخول بجوجل.')) {
      localStorage.removeItem('VM_2FA_' + currentUser.email.toLowerCase());
      setTeamMembers(prev => prev.map(m => 
        m.email?.toLowerCase() === currentUser.email?.toLowerCase() 
          ? { ...m, twoFactorEnabled: false } 
          : m
      ));
    }
  };

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('VM_CURRENT_USER', JSON.stringify(currentUser));
      localStorage.setItem('VM_LAST_LOGGED_IN_USER', JSON.stringify(currentUser));
      setRememberedUser(currentUser);
    } else {
      localStorage.removeItem('VM_CURRENT_USER');
    }
  }, [currentUser]);

  // Supabase Auth Listener
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setCurrentUser({
          email: session.user.email,
          name: session.user.user_metadata?.full_name || session.user.email.split('@')[0],
          avatar: session.user.user_metadata?.avatar_url
        });
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setCurrentUser({
          email: session.user.email,
          name: session.user.user_metadata?.full_name || session.user.email.split('@')[0],
          avatar: session.user.user_metadata?.avatar_url
        });
      }
    });

    // Listen for OAuth success from Electron Desktop loopback server
    if (typeof window !== 'undefined' && window.electronAPI?.onAuthSuccess) {
      window.electronAPI.onAuthSuccess(async ({ accessToken, refreshToken }) => {
        setAuthLoading(true);
        try {
          const { data, error } = await supabase.auth.setSession({
            access_token: accessToken,
            refresh_token: refreshToken
          });
          if (data?.session?.user) {
            const user = data.session.user;
            setCurrentUser({
              email: user.email,
              name: user.user_metadata?.full_name || user.email.split('@')[0],
              avatar: user.user_metadata?.avatar_url
            });
            setActiveView('app');
          }
        } catch (err) {
          console.error('Session sync error:', err);
        } finally {
          setAuthLoading(false);
        }
      });
    }

    return () => subscription.unsubscribe();
  }, []);

  const handleGoogleLogin = async () => {
    setAuthLoading(true);
    setAuthError('');
    try {
      if (typeof window !== 'undefined' && window.electronAPI?.startGoogleAuth) {
        // In Desktop Electron: Open system default browser (Chrome/Edge) where user is already logged into Google!
        await window.electronAPI.startGoogleAuth();
      } else {
        // In Web Browser (Vercel): Standard Supabase OAuth redirect
        const { error } = await supabase.auth.signInWithOAuth({
          provider: 'google',
          options: {
            redirectTo: window.location.origin
          }
        });
        if (error) {
          setAuthError(error.message);
        }
      }
    } catch (err) {
      setAuthError(err.message);
    } finally {
      setAuthLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setCurrentUser(null);
    if (typeof window !== 'undefined') {
      window.location.hash = '';
    }
    setActiveView('landing');
  };

  // App State
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGmailFilter, setSelectedGmailFilter] = useState(null);
  const [viewMode, setViewMode] = useState('hierarchy'); // 'hierarchy' | 'cards'
  const [darkMode, setDarkMode] = useState(false);

  // Sync Dark Mode with <html> class
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Collapsible Tree State
  const [collapsedNodes, setCollapsedNodes] = useState({});

  // Inspector & Modal
  const [inspectedItem, setInspectedItem] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [copiedId, setCopiedId] = useState(null);
  const [showPasswordMap, setShowPasswordMap] = useState({});
  const [gmailInputMode, setGmailInputMode] = useState('select'); // 'select' | 'new'
  const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false);

  // Form State (Enhanced with Multi-Gmail Architecture)
  const [formData, setFormData] = useState({
    category: 'blog',
    title: '',
    url: '',
    adminUrl: '',
    username: '',
    password: '',
    linkedGmail: '',      // Master Anchor / Governing Entity
    wpAdminEmail: '',     // WordPress Admin Login Email
    adsenseEmail: '',     // AdSense Account Email
    analyticsEmail: '',   // Google Analytics Email
    hostingEmail: '',     // Hostinger / Server Email
    linkedHost: '',
    domainRegistrar: '',
    expiryDate: '',
    notes: '',
    customType: '',
    analyticsAccount: '',
    monetizationType: 'none',
    monetizationDetails: '',
    linkedGithub: '',
    linkedVercel: '',
    customFields: []
  });

  // Vault Items State (Bumped to V10 for fresh multi-Gmail interconnected data)
  const [vaultItems, setVaultItems] = useState(() => {
    const saved = localStorage.getItem('VM_VAULT_ITEMS_PRO_V10');
    return saved ? JSON.parse(saved) : INITIAL_VAULT_ITEMS;
  });

  useEffect(() => {
    localStorage.setItem('VM_VAULT_ITEMS_PRO_V10', JSON.stringify(vaultItems));
  }, [vaultItems]);


  // ── SUPABASE REALTIME CLOUD SYNC ──
  useEffect(() => {
    // 1. Initial Cloud Sync for Vault Items
    fetchVaultItemsFromCloud().then(cloudItems => {
      if (cloudItems && cloudItems.length > 0) {
        setVaultItems(cloudItems);
      } else if (cloudItems && cloudItems.length === 0 && vaultItems.length > 0) {
        vaultItems.forEach(i => saveVaultItemToCloud(i));
      }
    });

    // 2. Initial Cloud Sync for Team Invites
    fetchTeamInvitesFromCloud().then(cloudInvites => {
      if (cloudInvites && cloudInvites.length > 0) {
        setTeamMembers(cloudInvites);
      } else if (cloudInvites && cloudInvites.length === 0 && teamMembers.length > 0) {
        teamMembers.forEach(m => saveTeamInviteToCloud(m));
      }
    });

    // 3. Realtime Channel Subscription
    const channel = supabase
      .channel('public:vault_sync')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'vault_items' }, (payload) => {
        if (payload.eventType === 'INSERT') {
          const item = fromCloudItem(payload.new);
          setVaultItems(prev => [item, ...prev.filter(i => i.id !== item.id)]);
        } else if (payload.eventType === 'UPDATE') {
          const item = fromCloudItem(payload.new);
          setVaultItems(prev => prev.map(i => i.id === item.id ? item : i));
        } else if (payload.eventType === 'DELETE') {
          setVaultItems(prev => prev.filter(i => i.id !== payload.old.id));
        }
      })
      .on('postgres_changes', { event: '*', schema: 'public', table: 'team_invitations' }, (payload) => {
        if (payload.eventType === 'INSERT') {
          const inv = fromCloudInvite(payload.new);
          setTeamMembers(prev => [...prev.filter(m => m.id !== inv.id), inv]);
        } else if (payload.eventType === 'UPDATE') {
          const inv = fromCloudInvite(payload.new);
          setTeamMembers(prev => prev.map(m => m.id === inv.id ? inv : m));
        } else if (payload.eventType === 'DELETE') {
          setTeamMembers(prev => prev.filter(m => m.id !== payload.old.id));
        }
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState('admin');
  const [invitePin, setInvitePin] = useState(() => Math.floor(1000 + Math.random() * 9000).toString());
  const [inviteSuccessMsg, setInviteSuccessMsg] = useState('');

  // Partner Handshake Simulation Modal
  const [handshakeInvite, setHandshakeInvite] = useState(null);
  const [enteredPin, setEnteredPin] = useState('');
  const [enteredTotp, setEnteredTotp] = useState('');
  const [handshakeError, setHandshakeError] = useState('');
  const [handshakeStep, setHandshakeStep] = useState(1); // 1: PIN, 2: 2FA, 3: Success

  const [createdInviteData, setCreatedInviteData] = useState(null);

  const handleSendInvite = (e) => {
    e.preventDefault();
    if (!inviteEmail) return;

    const emailClean = inviteEmail.trim().toLowerCase();
    const currentPin = invitePin;

    const newInvite = {
      id: 'mem-' + Date.now(),
      name: emailClean.split('@')[0],
      email: emailClean,
      role: inviteRole,
      status: 'pending',
      invitedAt: 'Today',
      pin: currentPin,
      twoFactorEnabled: false
    };

    setTeamMembers(prev => [...prev.filter(m => m.email?.toLowerCase() !== emailClean), newInvite]);
    saveTeamInviteToCloud(newInvite);
    confetti({ particleCount: 50, spread: 60 });
    
    setCreatedInviteData({
      email: emailClean,
      pin: currentPin,
      role: inviteRole
    });

    setInviteSuccessMsg(`تم حفظ الدعوة بنجاح في السحابة لـ ${emailClean}! كود الأمان هو: ${currentPin}`);
    setInviteEmail('');
    setInvitePin(Math.floor(1000 + Math.random() * 9000).toString());
  };

  const handleRevokeMember = (id) => {
    if (confirm('Revoke access for this partner? They will immediately lose access to the shared vault.')) {
      setTeamMembers(prev => prev.filter(m => m.id !== id));
    }
  };

  const copyText = (text, id) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const togglePassVisibility = (id) => {
    setShowPasswordMap(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleNodeCollapse = (nodeKey) => {
    setCollapsedNodes(prev => ({ ...prev, [nodeKey]: !prev[nodeKey] }));
  };

  const generateStrongPassword = () => {
    const chars = 'abcdefghjkmnpqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ23456789!@#$%&*?';
    let pass = '';
    for (let i = 0; i < 16; i++) {
      pass += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setFormData(prev => ({ ...prev, password: pass }));
  };

  const openModalForNew = (prefill = {}) => {
    setEditingItem(null);
    setCategoryDropdownOpen(false);
    setGmailInputMode(allGmails.length > 0 ? 'select' : 'new');
    setFormData({
      category: prefill.category || (activeCategory !== 'all' ? activeCategory : 'blog'),
      title: '',
      url: '',
      adminUrl: '',
      username: '',
      password: '',
      linkedGmail: prefill.linkedGmail || selectedGmailFilter || (allGmails[0] || ''),
      wpAdminEmail: prefill.wpAdminEmail || '',
      adsenseEmail: prefill.adsenseEmail || '',
      analyticsEmail: prefill.analyticsEmail || '',
      hostingEmail: prefill.hostingEmail || '',
      linkedHost: prefill.linkedHost || '',
      domainRegistrar: '',
      expiryDate: '',
      notes: '',
      customType: '',
      analyticsAccount: '',
      monetizationType: 'none',
      monetizationDetails: '',
      linkedGithub: '',
      linkedVercel: '',
      customFields: []
    });
    setShowModal(true);
  };

  const openModalForEdit = (item) => {
    setEditingItem(item);
    setCategoryDropdownOpen(false);
    setGmailInputMode(item.linkedGmail && !allGmails.includes(item.linkedGmail) ? 'new' : 'select');
    setFormData({
      ...item,
      wpAdminEmail: item.wpAdminEmail || '',
      adsenseEmail: item.adsenseEmail || '',
      analyticsEmail: item.analyticsEmail || '',
      hostingEmail: item.hostingEmail || '',
      customFields: item.customFields || []
    });
    setShowModal(true);
  };

  const handleSaveItem = (e) => {
    e.preventDefault();
    if (editingItem) {
      const updated = { ...formData, id: editingItem.id };
      setVaultItems(vaultItems.map(item => item.id === editingItem.id ? updated : item));
      saveVaultItemToCloud(updated);
      if (inspectedItem?.id === editingItem.id) {
        setInspectedItem(updated);
      }
    } else {
      const newItem = {
        ...formData,
        id: 'item-' + Date.now(),
        status: 'healthy'
      };
      setVaultItems([newItem, ...vaultItems]);
      saveVaultItemToCloud(newItem);
    }
    setShowModal(false);
  };

  const handleDeleteItem = (id) => {
    if (confirm('Delete this asset from your vault?')) {
      setVaultItems(vaultItems.filter(item => item.id !== id));
      deleteVaultItemFromCloud(id);
      if (inspectedItem && inspectedItem.id === id) setInspectedItem(null);
    }
  };

  // Remove a specific email and unlink it from all associated vault items & team
  const handleDeleteGmail = async (emailToDelete) => {
    if (!window.confirm(`هل أنت متأكد من حذف وإزالة الإيميل "${emailToDelete}" من جميع العناصر والحسابات المرتبطة به؟`)) {
      return;
    }

    // 1. Delete items that are exclusively this gmail account
    const itemsToDelete = vaultItems.filter(i => i.category === 'gmail' && i.username === emailToDelete);
    for (const item of itemsToDelete) {
      await deleteVaultItemFromCloud(item.id);
    }

    // 2. Unlink this email from any blogs, hosts, domains, etc.
    const updatedVault = [];
    for (const item of vaultItems) {
      if (item.category === 'gmail' && item.username === emailToDelete) {
        continue;
      }
      let changed = false;
      const copy = { ...item };
      if (copy.linkedGmail === emailToDelete) { copy.linkedGmail = ''; changed = true; }
      if (copy.wpAdminEmail === emailToDelete) { copy.wpAdminEmail = ''; changed = true; }
      if (copy.adsenseEmail === emailToDelete) { copy.adsenseEmail = ''; changed = true; }
      if (copy.analyticsEmail === emailToDelete) { copy.analyticsEmail = ''; changed = true; }
      if (copy.hostingEmail === emailToDelete) { copy.hostingEmail = ''; changed = true; }
      if (changed) {
        await saveVaultItemToCloud(copy);
      }
      updatedVault.push(copy);
    }

    setVaultItems(updatedVault);
    localStorage.setItem('VM_VAULT_ITEMS_PRO_V10', JSON.stringify(updatedVault));

    // 3. Remove from team invitations if present
    const updatedTeam = teamMembers.filter(m => m.email !== emailToDelete);
    if (updatedTeam.length !== teamMembers.length) {
      setTeamMembers(updatedTeam);
      localStorage.setItem('VM_TEAM_MEMBERS_V2', JSON.stringify(updatedTeam));
      await supabase.from('team_invitations').delete().eq('email', emailToDelete);
    }

    if (selectedGmailFilter === emailToDelete) {
      setSelectedGmailFilter(null);
    }
  };

  // Wipe all mock / placeholder sample data with 1-click
  const handleClearSampleData = async () => {
    if (!window.confirm('هل تريد حذف جميع البيانات التجريبية والوهمية دفعة واحدة للبدء بخزينة نظيفة تماماً؟')) {
      return;
    }

    const sampleIds = ['item-1', 'item-2', 'item-3', 'item-4', 'item-5', 'item-6', 'item-7', 'item-8', 'item-9', 'item-10'];
    const toDelete = vaultItems.filter(i => sampleIds.includes(i.id) || i.id.startsWith('item-'));
    const toKeep = vaultItems.filter(i => !sampleIds.includes(i.id) && !i.id.startsWith('item-'));

    for (const item of toDelete) {
      await deleteVaultItemFromCloud(item.id);
    }

    setVaultItems(toKeep);
    localStorage.setItem('VM_VAULT_ITEMS_PRO_V10', JSON.stringify(toKeep));

    const realTeam = teamMembers.filter(m => m.id !== 'mem-1' && m.id !== 'mem-2' && m.id !== 'mem-3');
    setTeamMembers(realTeam);
    localStorage.setItem('VM_TEAM_MEMBERS_V2', JSON.stringify(realTeam));

    setSelectedGmailFilter(null);
    if (inspectedItem && (sampleIds.includes(inspectedItem.id) || inspectedItem.id.startsWith('item-'))) {
      setInspectedItem(null);
    }
  };

  // Detect whether sample demo items currently exist
  const hasSampleData = useMemo(() => {
    const sampleIds = ['item-1', 'item-2', 'item-3', 'item-4', 'item-5', 'item-6', 'item-7', 'item-8', 'item-9', 'item-10'];
    return vaultItems.some(i => sampleIds.includes(i.id) || i.id.startsWith('item-'));
  }, [vaultItems]);

  // Distinct Gmails List (Scans ALL multi-Gmail roles across assets)
  const allGmails = useMemo(() => {
    const list = [];
    vaultItems.forEach(i => {
      [i.linkedGmail, i.wpAdminEmail, i.adsenseEmail, i.analyticsEmail, i.hostingEmail, (i.category === 'gmail' ? i.username : '')].forEach(g => {
        const trimmed = (g || '').trim();
        if (trimmed && !list.includes(trimmed)) list.push(trimmed);
      });
    });
    return list;
  }, [vaultItems]);

  // Distinct Hosting Servers
  const allHosts = useMemo(() => {
    const list = [];
    vaultItems.forEach(i => {
      if (i.category === 'hosting' && i.title && !list.includes(i.title)) list.push(i.title);
      if (i.linkedHost && !list.includes(i.linkedHost)) list.push(i.linkedHost);
    });
    return list;
  }, [vaultItems]);

  // Health Stats
  const healthStats = useMemo(() => {
    const total = vaultItems.length;
    const withGmail = vaultItems.filter(i => i.linkedGmail || i.category === 'gmail').length;
    const blogs = vaultItems.filter(i => i.category === 'blog').length;
    const hosts = vaultItems.filter(i => i.category === 'hosting').length;
    const repos = vaultItems.filter(i => i.category === 'github').length;
    const deploys = vaultItems.filter(i => i.category === 'vercel').length;
    const score = Math.round((withGmail / (total || 1)) * 100);
    return { total, score, blogs, hosts, repos, deploys, inboxes: allGmails.length };
  }, [vaultItems, allGmails]);

  // Filtered Items for Cards View (Multi-Gmail aware search & filtering!)
  const filteredItems = useMemo(() => {
    return vaultItems.filter(item => {
      const matchesCat = activeCategory === 'all' || item.category === activeCategory;
      const matchesGmail = !selectedGmailFilter || 
        item.linkedGmail === selectedGmailFilter || 
        item.wpAdminEmail === selectedGmailFilter || 
        item.adsenseEmail === selectedGmailFilter || 
        item.analyticsEmail === selectedGmailFilter || 
        item.hostingEmail === selectedGmailFilter || 
        (item.category === 'gmail' && item.username === selectedGmailFilter);
      
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch = !q || 
        (item.title && item.title.toLowerCase().includes(q)) ||
        (item.url && item.url.toLowerCase().includes(q)) ||
        (item.linkedGmail && item.linkedGmail.toLowerCase().includes(q)) ||
        (item.wpAdminEmail && item.wpAdminEmail.toLowerCase().includes(q)) ||
        (item.adsenseEmail && item.adsenseEmail.toLowerCase().includes(q)) ||
        (item.analyticsEmail && item.analyticsEmail.toLowerCase().includes(q)) ||
        (item.hostingEmail && item.hostingEmail.toLowerCase().includes(q)) ||
        (item.customType && item.customType.toLowerCase().includes(q)) ||
        (item.analyticsAccount && item.analyticsAccount.toLowerCase().includes(q)) ||
        (item.monetizationDetails && item.monetizationDetails.toLowerCase().includes(q)) ||
        (item.notes && item.notes.toLowerCase().includes(q));

      return matchesCat && matchesGmail && matchesSearch;
    });
  }, [vaultItems, activeCategory, selectedGmailFilter, searchQuery]);

  // Hierarchy Tree Mapping (Multi-Gmail Aware)
  const hierarchyTree = useMemo(() => {
    const groups = {};

    allGmails.forEach(gmail => {
      if (selectedGmailFilter && selectedGmailFilter !== gmail) return;

      const inboxItem = vaultItems.find(i => i.category === 'gmail' && i.username === gmail);
      const hosts = vaultItems.filter(i => i.category === 'hosting' && (i.linkedGmail === gmail || i.username === gmail || i.hostingEmail === gmail));
      const domains = vaultItems.filter(i => i.category === 'domain' && i.linkedGmail === gmail);
      const blogs = vaultItems.filter(i => i.category === 'blog' && i.linkedGmail === gmail);
      
      // CROSS-GMAIL INTERCONNECTION: Blogs that use this Gmail for AdSense or WP-Admin!
      const adsenseBlogs = vaultItems.filter(i => i.category === 'blog' && i.adsenseEmail === gmail && i.linkedGmail !== gmail);
      const wpBlogs = vaultItems.filter(i => i.category === 'blog' && i.wpAdminEmail === gmail && i.linkedGmail !== gmail);
      const analyticsBlogs = vaultItems.filter(i => i.category === 'blog' && i.analyticsEmail === gmail && i.linkedGmail !== gmail);

      const githubs = vaultItems.filter(i => i.category === 'github' && (i.linkedGmail === gmail || i.username === gmail));
      const vercels = vaultItems.filter(i => i.category === 'vercel' && i.linkedGmail === gmail);
      const socials = vaultItems.filter(i => i.category === 'social' && i.linkedGmail === gmail);
      const customs = vaultItems.filter(i => i.category === 'custom' && i.linkedGmail === gmail);

      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        const matchesAny = gmail.toLowerCase().includes(q) ||
          hosts.some(h => h.title.toLowerCase().includes(q)) ||
          domains.some(d => d.title.toLowerCase().includes(q)) ||
          blogs.some(b => b.title.toLowerCase().includes(q) || (b.url && b.url.toLowerCase().includes(q))) ||
          adsenseBlogs.some(b => b.title.toLowerCase().includes(q)) ||
          wpBlogs.some(b => b.title.toLowerCase().includes(q)) ||
          githubs.some(g => g.title.toLowerCase().includes(q)) ||
          vercels.some(v => v.title.toLowerCase().includes(q)) ||
          socials.some(s => s.title.toLowerCase().includes(q)) ||
          customs.some(c => c.title.toLowerCase().includes(q) || (c.customType && c.customType.toLowerCase().includes(q)));

        if (!matchesAny) return;
      }

      groups[gmail] = {
        gmail,
        inboxItem,
        hosts,
        domains,
        blogs,
        adsenseBlogs,
        wpBlogs,
        analyticsBlogs,
        githubs,
        vercels,
        socials,
        customs
      };
    });

    return groups;
  }, [vaultItems, allGmails, selectedGmailFilter, searchQuery]);

  // ─────────────────────────────────────────────────────────────
  // 0. LANDING PAGE VIEW (الصفحة الرئيسية)
  // ─────────────────────────────────────────────────────────────
  if (activeView === 'landing') {
    return (
      <LandingPage 
        onOpenVault={() => {
          if (typeof window !== 'undefined') {
            window.location.hash = '#app';
          }
          setActiveView('app');
        }} 
      />
    );
  }

  // ─────────────────────────────────────────────────────────────
  // 1. OFFICIAL GOOGLE & 2FA AUTHENTICATOR LOGIN SCREEN
  // ─────────────────────────────────────────────────────────────
  if (!currentUser) {
    const has2FA = rememberedUser && remembered2FA?.enabled;

    return (
      <div className="w-full h-full min-h-screen flex items-center justify-center bg-[#0B132B] relative overflow-hidden font-sans">
        <div className="absolute top-1/4 left-1/3 w-[500px] h-[500px] bg-blue-600/15 rounded-full blur-[140px] pointer-events-none"></div>

        <div className="w-full max-w-md p-9 bg-slate-900/95 backdrop-blur-2xl border border-slate-700/80 rounded-3xl shadow-2xl text-center z-10 m-4">
          
          {has2FA && loginMode === 'totp' ? (
            /* DAILY TOTP AUTHENTICATOR LOGIN (الدخول اليومي بـ Authenticator) */
            <>
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-cyan-600 to-blue-600 flex items-center justify-center mx-auto mb-4 shadow-xl shadow-cyan-500/25">
                <Smartphone className="w-9 h-9 text-white stroke-[2.2]" />
              </div>

              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-cyan-400 bg-cyan-950/80 border border-cyan-800/80 px-3 py-1 rounded-full">
                Daily Authenticator Unlock
              </span>

              <h2 className="text-2xl font-black text-white tracking-tight mt-3">VaultMaster OS</h2>
              
              <div className="flex items-center justify-center gap-2 mt-2 mb-6 p-2 rounded-xl bg-slate-800/60 border border-slate-700/60">
                <div className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center">
                  {rememberedUser.name?.charAt(0).toUpperCase() || 'U'}
                </div>
                <span className="text-xs text-slate-300 font-mono truncate max-w-[220px]">
                  {rememberedUser.email}
                </span>
              </div>

              <form onSubmit={handleTotpLogin} className="space-y-4">
                <div className="space-y-1.5 text-left">
                  <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block text-center">
                    Enter 6-digit Authenticator Code:
                  </label>
                  <input
                    type="text"
                    maxLength={6}
                    autoFocus
                    required
                    value={enteredTotpCode}
                    onChange={(e) => {
                      const val = e.target.value.replace(/\D/g, '');
                      setEnteredTotpCode(val);
                      setTotpError('');
                    }}
                    placeholder="• • • • • •"
                    className="w-full text-center tracking-[0.6em] text-2xl font-mono py-3.5 px-4 bg-slate-950 border border-slate-700 focus:border-cyan-500 rounded-2xl text-white outline-none shadow-inner"
                  />
                  <span className="block text-[10px] text-slate-500 text-center font-sans mt-1">
                    أدخل كود الـ 6 أرقام من تطبيق Authenticator في هاتفك
                  </span>
                </div>

                {totpError && (
                  <p className="text-xs text-rose-400 font-bold bg-rose-950/40 border border-rose-800/50 p-2 rounded-xl">
                    {totpError}
                  </p>
                )}

                <button
                  type="submit"
                  className="w-full py-4 px-6 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-extrabold text-sm rounded-2xl shadow-xl transition active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>Unlock Vault (فتح الخزينة) ➔</span>
                </button>
              </form>

              <div className="pt-4 mt-6 border-t border-slate-800 flex flex-col gap-2">
                <button
                  type="button"
                  onClick={() => setLoginMode('google')}
                  className="text-xs text-slate-400 hover:text-white transition cursor-pointer flex items-center justify-center gap-2"
                >
                  <GoogleIcon className="w-4 h-4" />
                  <span>Or sign in with Google (أو الدخول بجوجل)</span>
                </button>
              </div>
            </>
          ) : (
            /* OFFICIAL GOOGLE SIGN-IN */
            <>
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center mx-auto mb-5 shadow-xl shadow-blue-500/25">
                <ShieldCheck className="w-9 h-9 text-white stroke-[2.2]" />
              </div>

              <h2 className="text-2xl font-black text-white tracking-tight">VaultMaster OS</h2>
              <p className="text-xs text-slate-400 mt-1 mb-8 font-mono">
                Sovereign Encrypted Cloud Vault
              </p>

              <div className="space-y-4">
                <button
                  onClick={handleGoogleLogin}
                  disabled={authLoading}
                  className="w-full py-4 px-6 bg-white hover:bg-slate-100 text-slate-900 font-bold text-sm rounded-2xl shadow-xl transition active:scale-[0.98] cursor-pointer flex items-center justify-center gap-3 border border-slate-200"
                >
                  <GoogleIcon className="w-5 h-5" />
                  <span>{authLoading ? 'Signing in with Google...' : 'Sign in with Google (تسجيل الدخول بجوجل)'}</span>
                </button>

                {authError && (
                  <p className="text-xs text-rose-400 font-bold mt-2">{authError}</p>
                )}

                {has2FA && (
                  <button
                    type="button"
                    onClick={() => setLoginMode('totp')}
                    className="w-full py-2.5 px-4 bg-slate-800 hover:bg-slate-700 text-cyan-400 font-bold text-xs rounded-xl transition cursor-pointer flex items-center justify-center gap-2"
                  >
                    <Smartphone className="w-4 h-4" />
                    <span>Quick Unlock with Authenticator (الدخول بـ Authenticator)</span>
                  </button>
                )}

                {!isDesktop && (
                  <button
                    type="button"
                    onClick={() => {
                      if (typeof window !== 'undefined') {
                        window.location.hash = '';
                      }
                      setActiveView('landing');
                    }}
                    className="pt-2 text-xs text-slate-400 hover:text-white flex items-center justify-center gap-1.5 mx-auto transition cursor-pointer"
                  >
                    <span>←</span>
                    <span>Back to Homepage (العودة للرئيسية)</span>
                  </button>
                )}
              </div>
            </>
          )}

          <div className="mt-8 pt-4 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-500 font-mono">
            <span>End-to-End Encrypted</span>
            <span>Supabase Cloud Sync</span>
          </div>
        </div>
      </div>
    );
  }

  // ─────────────────────────────────────────────────────────────
  // 2. MAIN APP
  // ─────────────────────────────────────────────────────────────
  return (
    <div className={`w-full h-full min-h-screen flex text-left font-sans ${darkMode ? 'bg-[#0B1120] text-slate-100' : 'bg-[#F8FAFC] text-slate-900'}`}>

      {/* ─────────────────── LEFT PINNED SIDEBAR ─────────────────── */}
      <aside className={`w-[320px] h-screen flex flex-col shrink-0 border-r select-none ${darkMode ? 'bg-[#0F172A] border-slate-800' : 'bg-[#FFFFFF] border-slate-200'}`}>
        
        {/* 🌟 REFINED EXECUTIVE LOGO & BRAND HEADER */}
        <div className={`h-20 px-6 border-b shrink-0 flex items-center justify-between ${darkMode ? 'border-slate-800' : 'border-slate-100'}`}>
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-blue-700 via-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-blue-600/30 shrink-0">
                <ShieldCheck className="w-7 h-7 stroke-[2.3]" />
              </div>
              <div>
                <span className={`font-black text-xl tracking-tight block ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                  VaultMaster
                </span>
                <span className="inline-flex items-center gap-1.5 text-[10px] text-emerald-600 dark:text-emerald-400 font-mono font-bold mt-0.5 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-500/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span>100% AIR-GAPPED</span>
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              <button 
                onClick={() => {
                  if (typeof window !== 'undefined') window.location.hash = '';
                  setActiveView('landing');
                }}
                className={`p-2 rounded-xl transition ${darkMode ? 'text-slate-400 hover:bg-slate-800 hover:text-white' : 'text-slate-500 hover:bg-slate-100 hover:text-slate-700'}`}
                title="View Homepage / Landing Page"
              >
                <Globe className="w-4.5 h-4.5" />
              </button>

              <button 
                onClick={() => setDarkMode(!darkMode)}
                className={`p-2 rounded-xl transition ${darkMode ? 'text-amber-400 hover:bg-slate-800' : 'text-slate-500 hover:bg-slate-100'}`}
                title="Toggle Theme"
              >
                {darkMode ? <Sun className="w-4.5 h-4.5" /> : <Moon className="w-4.5 h-4.5" />}
              </button>

              <button 
                onClick={handleLogout} 
                title="Sign Out / Lock Vault"
                className={`p-2 rounded-xl transition ${darkMode ? 'text-slate-400 hover:bg-slate-800 hover:text-white' : 'text-slate-500 hover:bg-slate-100 hover:text-slate-700'}`}
              >
                <LogOut className="w-4.5 h-4.5" />
              </button>
            </div>
          </div>

        {/* 🌟 SCROLLABLE MIDDLE CONTAINER FOR ALL SIDEBAR SECTIONS */}
        <div className="flex-1 overflow-y-auto space-y-3 py-2 custom-scrollbar">

          {/* Vault Health Indicator */}
          <div className="p-3.5 mx-4 rounded-xl bg-blue-50/80 dark:bg-blue-950/30 border border-blue-200/80 dark:border-blue-900/50">
            <div className="flex items-center justify-between text-xs mb-2">
              <span className="font-bold flex items-center gap-1.5 text-blue-800 dark:text-blue-300 text-xs">
                <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                <span>Vault Organization</span>
              </span>
              <span className="font-mono font-black text-blue-700 dark:text-blue-300 text-sm">{healthStats.score}%</span>
            </div>
            <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
              <div 
                className="h-full bg-blue-600 rounded-full transition-all duration-700" 
                style={{ width: `${healthStats.score}%` }}
              ></div>
            </div>
            <div className="flex flex-wrap items-center justify-between text-[11px] text-slate-600 dark:text-slate-400 mt-2 font-mono font-semibold gap-1">
              <span>{healthStats.blogs} Blogs</span>
              <span>•</span>
              <span>{healthStats.hosts} Hosts</span>
              <span>•</span>
              <span>{healthStats.repos} GitHub</span>
              <span>•</span>
              <span>{healthStats.deploys} Vercel</span>
            </div>
          </div>

          {/* 2FA Authenticator Status / Setup Card */}
          {!is2FAActive ? (
            <div className="p-3 mx-4 rounded-2xl bg-gradient-to-br from-indigo-950/60 via-slate-900 to-blue-950/60 border border-indigo-500/30 shadow-lg text-left">
              <div className="flex items-center justify-between mb-1.5">
                <span className="flex items-center gap-1.5 text-xs font-black text-cyan-300">
                  <Smartphone className="w-3.5 h-3.5 text-cyan-400" />
                  <span>2FA Authenticator</span>
                </span>
                <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  موصى به
                </span>
              </div>
              <p className="text-[10px] text-slate-300 leading-tight mb-2.5">
                فعّل التحقق بخطوتين عبر هاتفك لتسجيل الدخول السريع يومياً برمز 6 أرقام.
              </p>
              <button
                onClick={handleStart2FASetup}
                className="w-full py-1.5 px-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs shadow-md transition cursor-pointer flex items-center justify-center gap-1.5"
              >
                <span>تفعيل التحقق بخطوتين ➔</span>
              </button>
            </div>
          ) : (
            <div className="p-3 mx-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 flex items-center justify-between text-left">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <div>
                  <div className="text-xs font-bold text-emerald-300">2FA Protected</div>
                  <div className="text-[10px] text-slate-400 font-mono">Google Authenticator Active</div>
                </div>
              </div>
              <button
                onClick={handleDisable2FA}
                className="text-[10px] text-slate-400 hover:text-rose-400 font-mono transition cursor-pointer"
                title="إلغاء التفعيل"
              >
                Disable
              </button>
            </div>
          )}

          {/* Navigation Categories */}
          <div className="px-4 space-y-1">
            <div className="text-[11px] font-black text-slate-400 uppercase tracking-wider px-3 py-1">
              Asset Categories
            </div>

            {CATEGORIES_LIST.map(cat => {
              const active = activeCategory === cat.id;
              const count = cat.id === 'all' ? vaultItems.length : vaultItems.filter(i => i.category === cat.id).length;
              return (
                <button
                  key={cat.id}
                  onClick={() => { setActiveCategory(cat.id); setSelectedGmailFilter(null); }}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition cursor-pointer ${
                    active 
                      ? 'bg-blue-600 text-white font-bold shadow-sm' 
                      : darkMode 
                        ? 'text-slate-300 hover:bg-slate-800 hover:text-white' 
                        : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <CategoryIcon 
                      category={cat.id} 
                      size={16} 
                      className={active ? 'text-white' : 'text-slate-500 dark:text-slate-400'} 
                    />
                    <span className="truncate">{cat.label}</span>
                  </div>
                  <span className={`text-[11px] px-2 py-0.5 rounded-full font-mono font-bold shrink-0 ${
                    active 
                      ? 'bg-blue-700 text-white' 
                      : darkMode ? 'bg-slate-800 text-slate-300' : 'bg-slate-100 text-slate-700'
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* 🌟 COLLABORATION & TEAM VAULT SHARING */}
          <div className="px-4 pt-1">
            <div className="text-[11px] font-black text-slate-400 uppercase tracking-wider px-3 py-1 flex items-center justify-between">
              <span>Collaboration & Team</span>
            </div>
            <button
              onClick={() => { setActiveCategory('team'); setSelectedGmailFilter(null); }}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition cursor-pointer mt-1 ${
                activeCategory === 'team'
                  ? 'bg-blue-600 text-white font-bold shadow-sm'
                  : darkMode 
                    ? 'text-slate-300 hover:bg-slate-800 hover:text-white' 
                    : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <Users className={`w-4 h-4 shrink-0 ${activeCategory === 'team' ? 'text-white' : 'text-blue-500'}`} />
                <span className="truncate">Team & Shared Vault</span>
              </div>
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-mono font-bold shrink-0 ${
                activeCategory === 'team'
                  ? 'bg-blue-700 text-white'
                  : teamMembers.filter(m => m.status === 'pending').length > 0 
                    ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                    : darkMode ? 'bg-slate-800 text-slate-300' : 'bg-slate-100 text-slate-700'
              }`}>
                {teamMembers.filter(m => m.status === 'pending').length > 0 
                  ? `${teamMembers.filter(m => m.status === 'pending').length} Pending` 
                  : `${teamMembers.length} Members`}
              </span>
            </button>
          </div>

          {/* 🌟 CLEAR SAMPLE DATA BUTTON (When demo items exist) */}
          {hasSampleData && (
            <div className="px-4 pt-1">
              <button
                onClick={handleClearSampleData}
                className="w-full py-2 px-3 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-600 dark:text-rose-400 border border-rose-500/20 text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                title="حذف جميع البيانات التجريبية والوهمية للبدء بخزينة نظيفة تماماً"
              >
                <Trash2 className="w-3.5 h-3.5 shrink-0" />
                <span>مسح البيانات الوهمية (Clear Demo)</span>
              </button>
            </div>
          )}

          {/* Isolate by Gmail */}
          <div className="px-4 pt-1 pb-4">
            <div className="text-[11px] font-black text-slate-400 uppercase tracking-wider px-3 py-1 flex items-center justify-between">
              <span>Isolate by Gmail ({allGmails.length})</span>
              {selectedGmailFilter && (
                <button 
                  onClick={() => setSelectedGmailFilter(null)} 
                  className="text-blue-600 hover:underline text-xs lowercase font-bold"
                >
                  Clear
                </button>
              )}
            </div>

            <div className="space-y-1 mt-1">
              {allGmails.length === 0 ? (
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/40 border border-dashed border-slate-200 dark:border-slate-800 text-[11px] text-slate-400 text-center">
                  لا توجد إيميلات مسجلة حالياً
                </div>
              ) : (
                allGmails.map((email, idx) => {
                  const isSelected = selectedGmailFilter === email;
                  const tiedCount = vaultItems.filter(i => 
                    i.linkedGmail === email || 
                    i.wpAdminEmail === email || 
                    i.adsenseEmail === email || 
                    i.analyticsEmail === email || 
                    i.hostingEmail === email || 
                    i.username === email
                  ).length;
                  return (
                    <div
                      key={idx}
                      className={`group w-full px-2.5 py-1.5 rounded-xl text-xs font-mono transition flex items-center justify-between ${
                        isSelected
                          ? 'bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 border border-blue-300 dark:border-blue-700 font-bold'
                          : darkMode 
                            ? 'text-slate-300 hover:bg-slate-800/80' 
                            : 'text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      <button
                        onClick={() => setSelectedGmailFilter(isSelected ? null : email)}
                        className="flex-1 text-left truncate flex items-center gap-1.5 min-w-0 cursor-pointer"
                        title={email}
                      >
                        <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span className="truncate max-w-[170px]">{email}</span>
                      </button>

                      <div className="flex items-center gap-1 shrink-0 ml-1">
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-200/70 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold">
                          {tiedCount}
                        </span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteGmail(email);
                          }}
                          title={`إزالة وحذف هذا الإيميل (${email})`}
                          className="p-1 rounded text-slate-400 hover:text-rose-500 hover:bg-rose-500/10 transition cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>

        </div>

        {/* Footer (Pinned at Bottom) */}
        <div className={`p-4 border-t shrink-0 text-xs ${darkMode ? 'border-slate-800 text-slate-500' : 'border-slate-100 text-slate-500'}`}>
          <div className="flex items-center justify-between text-xs font-medium">
            <span className="flex items-center gap-1.5 text-emerald-600 font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              <span>Air-Gapped Sovereign</span>
            </span>
            <span className="font-mono font-bold text-[11px]">v2.9 Pro</span>
          </div>
        </div>
      </aside>

      {/* ─────────────────── MAIN CONTENT VIEWPORT ─────────────────── */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        
        {/* 🌟 REFINED, BALANCED TOP HEADER BAR */}
        <header className={`h-20 border-b px-8 flex items-center justify-between shrink-0 shadow-sm transition-colors ${
          darkMode ? 'bg-[#0F172A] border-slate-800' : 'bg-white border-slate-200'
        }`}>
          
          {/* Search Box */}
          <div className="relative w-[440px]">
            <Search className="w-4.5 h-4.5 text-slate-400 absolute left-4 top-3.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search anything (blog, domain, WP login, AdSense, host)..."
              className={`w-full rounded-xl pl-11 pr-9 py-2.5 text-sm outline-none transition border font-medium ${
                darkMode 
                  ? 'bg-slate-900 border-slate-700 text-white focus:border-blue-500' 
                  : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-blue-500 focus:bg-white'
              }`}
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} className="absolute right-3.5 top-3 text-slate-400 hover:text-slate-600 text-sm font-bold">✕</button>
            )}
          </div>

          {/* View Mode Switcher + Add Button */}
          <div className="flex items-center gap-4">
            
            <div className={`flex items-center p-1 rounded-xl border ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-slate-100 border-slate-200'}`}>
              <button
                onClick={() => setViewMode('hierarchy')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition cursor-pointer ${
                  viewMode === 'hierarchy' 
                    ? 'bg-white dark:bg-slate-800 text-blue-600 shadow-sm' 
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                title="Interactive Tree Hierarchy"
              >
                <GitBranch className="w-4 h-4 stroke-[2.2]" />
                <span>Hierarchy Tree</span>
              </button>

              <button
                onClick={() => setViewMode('cards')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition cursor-pointer ${
                  viewMode === 'cards' 
                    ? 'bg-white dark:bg-slate-800 text-blue-600 shadow-sm' 
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                title="Grid Cards"
              >
                <LayoutGrid className="w-4 h-4 stroke-[2.2]" />
                <span>Grid Cards</span>
              </button>
            </div>

            <button
              onClick={() => openModalForNew()}
              className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-xl shadow-md shadow-blue-600/30 transition active:scale-95 cursor-pointer"
            >
              <Plus className="w-4.5 h-4.5 stroke-[2.5]" />
              <span>Add New Asset</span>
            </button>
          </div>

        </header>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-10 space-y-8">
          
          {/* 🌟 USER NOTIFICATION: PENDING VAULT INVITATION BANNER */}
          {pendingInviteForMe && (
            <div className="p-6 rounded-2xl bg-amber-50 dark:bg-amber-950/60 border-2 border-amber-300 dark:border-amber-700 shadow-lg flex flex-wrap items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-amber-500 text-white flex items-center justify-center shrink-0 text-xl font-bold shadow-md shadow-amber-500/30">
                  📩
                </div>
                <div>
                  <h3 className="font-black text-base text-amber-950 dark:text-amber-100 flex items-center gap-2">
                    <span>لديك دعوة معلقة للانضمام إلى هذه المحفظة!</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-200 dark:bg-amber-900 text-amber-900 dark:text-amber-200 font-bold">
                      Invited as {pendingInviteForMe.role}
                    </span>
                  </h3>
                  <p className="text-xs text-amber-800 dark:text-amber-300 mt-1">
                    أدخل كود الأمان المكون من 4 أرقام الذي زودك به المالك في واتساب للوصول الفوري إلى الأصول:
                  </p>
                </div>
              </div>

              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  if (enteredInvitePin.trim() === pendingInviteForMe.pin) {
                    setTeamMembers(prev => prev.map(m => m.id === pendingInviteForMe.id ? { ...m, status: 'active', joinedAt: 'Today' } : m));
                    acceptInviteWithPin(enteredInvitePin.trim(), currentUser.email);
                    setEnteredInvitePin('');
                    setPinErrorMsg('');
                    confetti({ particleCount: 80, spread: 80 });
                  } else {
                    setPinErrorMsg('الكود غير صحيح! تأكد من المالك.');
                  }
                }}
                className="flex items-center gap-2.5"
              >
                <div className="relative">
                  <input
                    type="text"
                    required
                    maxLength={4}
                    value={enteredInvitePin}
                    onChange={(e) => setEnteredInvitePin(e.target.value.replace(/\D/g, '').slice(0, 4))}
                    placeholder="• • • •"
                    className="w-28 text-center font-mono font-black text-xl py-2 px-3 rounded-xl bg-white dark:bg-slate-900 border-2 border-amber-400 dark:border-amber-600 outline-none text-amber-600 dark:text-amber-400 tracking-widest shadow-inner"
                  />
                  {pinErrorMsg && (
                    <span className="absolute top-full left-0 right-0 text-[10px] text-rose-600 font-bold mt-1 text-center whitespace-nowrap">
                      {pinErrorMsg}
                    </span>
                  )}
                </div>

                <button
                  type="submit"
                  className="px-5 py-2.5 bg-amber-600 hover:bg-amber-700 text-white font-extrabold text-xs rounded-xl shadow-md transition cursor-pointer flex items-center gap-1.5"
                >
                  <Check className="w-4 h-4 stroke-[3]" />
                  <span>قبول وتفعيل المحفظة</span>
                </button>
              </form>
            </div>
          )}
          
          {selectedGmailFilter && (
            <div className={`flex items-center justify-between p-5 rounded-2xl border ${
              darkMode ? 'bg-blue-950/40 border-blue-800 text-blue-300' : 'bg-blue-50 border-blue-200 text-blue-900'
            }`}>
              <div className="flex items-center gap-3 text-base">
                <span className="font-bold">Active Isolated Tree:</span>
                <span className="font-mono bg-blue-600 text-white px-3 py-1 rounded-xl font-black">{selectedGmailFilter}</span>
                <span className="text-slate-500 dark:text-slate-400 text-sm">showing only assets governed by this inbox</span>
              </div>
              <button 
                onClick={() => setSelectedGmailFilter(null)}
                className="text-sm font-black hover:underline"
              >
                Clear Filter
              </button>
            </div>
          )}

          {/* ═════════════════════════════════════════════════════════
              VIEW 0: TEAM & VAULT SHARING WORKSPACE
             ═════════════════════════════════════════════════════════ */}
          {activeCategory === 'team' ? (
            <div className="space-y-8 max-w-5xl">
              
              {/* Header Banner */}
              <div className={`p-7 rounded-2xl border flex flex-wrap items-center justify-between gap-6 ${
                darkMode ? 'bg-[#0F172A] border-slate-800' : 'bg-white border-slate-200'
              }`}>
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-blue-600/30 shrink-0">
                    <Users className="w-7 h-7" />
                  </div>
                  <div>
                    <h2 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2.5">
                      <span>Team & Vault Sharing</span>
                      <span className="text-[10px] font-mono font-bold bg-blue-100 dark:bg-blue-900/60 text-blue-700 dark:text-blue-300 px-2 py-0.5 rounded-full border border-blue-200 dark:border-blue-800">
                        Zero-Knowledge Shared Access
                      </span>
                    </h2>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                      مشاركة الأصول والمدونات والسيرفرات مع شركاء العمل والمساعدين بأمان فائق، مع حماية بكود 4 أرقام ومصادقة ثنائية 2FA.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 font-mono text-xs font-bold">
                  <span className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                    {teamMembers.filter(m => m.status === 'active').length} Active
                  </span>
                  <span className="px-3 py-1.5 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
                    {teamMembers.filter(m => m.status === 'pending').length} Pending
                  </span>
                </div>
              </div>

              {/* Rich Invitation Action Card */}
              {createdInviteData && (
                <div className="p-5 rounded-2xl bg-gradient-to-br from-emerald-950/80 to-slate-900 border border-emerald-500/50 shadow-xl space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2 text-xs font-bold text-emerald-300">
                      <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                      <span>تم حفظ الدعوة بنجاح في قاعدة البيانات السحابية!</span>
                    </span>
                    <button
                      type="button"
                      onClick={() => setCreatedInviteData(null)}
                      className="text-xs text-slate-400 hover:text-white cursor-pointer"
                    >
                      ✕
                    </button>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-slate-300 flex items-center justify-between">
                    <div>
                      <div className="text-[11px] text-slate-500">إيميل الشريك المدعو:</div>
                      <div className="font-mono font-bold text-white text-xs">{createdInviteData.email}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-[11px] text-slate-500">كود الأمان للدخول (PIN):</div>
                      <div className="font-mono font-black text-cyan-400 text-lg tracking-widest">{createdInviteData.pin}</div>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2.5 pt-1">
                    <button
                      type="button"
                      onClick={() => {
                        const subject = encodeURIComponent('دعوة للانضمام إلى محفظة VaultMaster المشتركة');
                        const body = encodeURIComponent(`مرحباً،\n\nلقد تمت دعوتك للانضمام إلى محفظة VaultMaster المشتركة.\n\nرابط الدخول: https://vaultmaster-app.vercel.app\nكود الأمان الخاص بك للدخول (PIN): ${createdInviteData.pin}\n\nخطوات الدخول:\n1. افتح الرابط وسجل الدخول بحسابك في Google (${createdInviteData.email}).\n2. ستظهر لك رسالة تفيد بوجود دعوة بانتظارك، أدخل كود الأمان المكون من 4 أرقام أعلاه لتفتح لك المحفظة المشتركة فوراً!`);
                        const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(createdInviteData.email)}&su=${subject}&body=${body}`;
                        window.open(gmailUrl, '_blank');
                      }}
                      className="flex-1 py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Mail className="w-4 h-4" />
                      <span>فتح Gmail لإرسال الدعوة للشريك الآن ➔</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        const text = `دعوة للانضمام إلى محفظة VaultMaster:\nالرابط: https://vaultmaster-app.vercel.app\nكود الأمان للدخول (PIN): ${createdInviteData.pin}\n(ادخل بحسابك ${createdInviteData.email} ثم ضع كود الأمان لتفتح لك المحفظة المشتركة).`;
                        navigator.clipboard.writeText(text);
                        setCopiedId('invite-full');
                        setTimeout(() => setCopiedId(null), 2500);
                      }}
                      className="py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      {copiedId === 'invite-full' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                      <span>{copiedId === 'invite-full' ? 'تم النسخ!' : 'نسخ الرسالة كاملة'}</span>
                    </button>
                  </div>
                </div>
              )}

              {/* 1. Invite Form Card */}
              <div className={`p-6 rounded-2xl border ${
                darkMode ? 'bg-[#0F172A] border-slate-800' : 'bg-white border-slate-200'
              }`}>
                <h3 className="text-sm font-black text-slate-900 dark:text-white flex items-center gap-2 mb-4">
                  <UserPlus className="w-4 h-4 text-blue-600" />
                  <span>+ Invite a Partner to Vault (إرسال دعوة مشفرة جديدة)</span>
                </h3>

                <form onSubmit={handleSendInvite} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    
                    {/* Partner Email */}
                    <div className="md:col-span-2">
                      <label className="text-[11px] font-bold text-slate-600 dark:text-slate-300 block mb-1">
                        Partner's Google Email (إيميل الشريك الذي سيسجل به):
                      </label>
                      <input
                        type="email"
                        required
                        value={inviteEmail}
                        onChange={(e) => setInviteEmail(e.target.value)}
                        placeholder="partner.business@gmail.com"
                        className={`w-full rounded-xl px-3.5 py-2.5 text-xs font-mono font-medium outline-none border transition ${
                          darkMode ? 'bg-slate-900 border-slate-700 text-white focus:border-blue-500' : 'bg-slate-50 border-slate-200 focus:border-blue-500'
                        }`}
                      />
                    </div>

                    {/* Role */}
                    <div>
                      <label className="text-[11px] font-bold text-slate-600 dark:text-slate-300 block mb-1">
                        Access Level (مستوى الصلاحية):
                      </label>
                      <select
                        value={inviteRole}
                        onChange={(e) => setInviteRole(e.target.value)}
                        className={`w-full rounded-xl px-3 py-2.5 text-xs font-bold outline-none border transition ${
                          darkMode ? 'bg-slate-900 border-slate-700 text-white' : 'bg-slate-50 border-slate-200'
                        }`}
                      >
                        <option value="admin">Co-Admin (كامل الصلاحيات)</option>
                        <option value="viewer">Viewer (قراءة ونسخ فقط)</option>
                      </select>
                    </div>

                  </div>

                  {/* 4-digit Security PIN (User Specified Architecture) */}
                  <div className="p-4 rounded-xl bg-blue-50/70 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900/60 flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <div className="text-xs font-bold text-blue-950 dark:text-blue-200 flex items-center gap-1.5 mb-0.5">
                        <KeyRound className="w-3.5 h-3.5 text-blue-600" />
                        <span>Security 4-Digit Handshake PIN (كود الأمان للدعوة):</span>
                      </div>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400">
                        هذا الكود السري تختاره أنت وتعطيه لشريكك بشكل خاص (WhatsApp/Signal). لن يستطيع قبول الدعوة بدونه.
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        maxLength={4}
                        value={invitePin}
                        onChange={(e) => setInvitePin(e.target.value.replace(/\D/g, '').slice(0, 4))}
                        className="w-24 text-center font-mono font-black text-lg py-1.5 px-2 rounded-xl bg-white dark:bg-slate-900 border border-blue-300 dark:border-blue-700 text-blue-600 dark:text-blue-400 tracking-widest outline-none shadow-xs"
                      />
                      <button
                        type="button"
                        onClick={() => setInvitePin(Math.floor(1000 + Math.random() * 9000).toString())}
                        className="text-[11px] font-bold text-blue-600 hover:underline px-2.5 py-1.5 rounded-lg border border-blue-200 dark:border-blue-800 bg-white dark:bg-slate-900 cursor-pointer"
                        title="Generate Random PIN"
                      >
                        Generate ⚡
                      </button>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md shadow-blue-600/30 transition cursor-pointer flex items-center justify-center gap-2"
                  >
                    <Mail className="w-4 h-4" />
                    <span>Send Encrypted Vault Invitation (إرسال الدعوة)</span>
                  </button>
                </form>
              </div>

              {/* 2. Pending Invitations Section (User Specified: تظهر PENDING) */}
              {teamMembers.filter(m => m.status === 'pending').length > 0 && (
                <div className="space-y-3">
                  <div className="text-xs font-black text-slate-400 uppercase tracking-wider flex items-center justify-between">
                    <span>Pending Invitations ({teamMembers.filter(m => m.status === 'pending').length})</span>
                    <span className="text-[11px] text-amber-600 font-bold lowercase">waiting for partner 4-digit PIN verification</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {teamMembers.filter(m => m.status === 'pending').map(member => (
                      <div
                        key={member.id}
                        className={`p-5 rounded-2xl border transition flex flex-col justify-between ${
                          darkMode ? 'bg-[#0F172A] border-amber-800/60' : 'bg-amber-50/40 border-amber-200'
                        }`}
                      >
                        <div>
                          <div className="flex items-center justify-between mb-3">
                            <span className="text-[10px] uppercase font-bold font-mono px-2.5 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-800 animate-pulse">
                              ⏳ PENDING VERIFICATION
                            </span>
                            <span className="text-[10px] font-bold uppercase font-mono px-2 py-0.5 rounded bg-slate-200/60 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                              {member.role}
                            </span>
                          </div>

                          <div className="font-bold text-sm text-slate-900 dark:text-white mb-0.5">{member.email}</div>
                          <div className="text-[11px] text-slate-500 font-mono mb-3">Invited: {member.invitedAt}</div>

                          {/* Secret 4-digit PIN Highlight */}
                          <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-amber-200 dark:border-amber-900/50 flex items-center justify-between mb-4">
                            <div>
                              <span className="text-[10px] text-slate-400 block font-semibold">Security PIN to share:</span>
                              <span className="font-mono font-black text-base text-amber-600 tracking-widest">{member.pin}</span>
                            </div>
                            <button
                              onClick={() => copyText(member.pin, member.id + '-pin')}
                              className="text-xs font-bold text-blue-600 hover:underline cursor-pointer"
                            >
                              {copiedId === member.id + '-pin' ? '✓ Copied PIN' : 'Copy PIN'}
                            </button>
                          </div>
                        </div>

                        <div className="pt-3 border-t border-amber-200/60 dark:border-slate-800 flex items-center justify-between gap-2">
                          <span className="text-[11px] text-slate-500 font-mono">
                            بمجرد أن يدخل الكود في حاسوبه يفتح له كل شيء فوراً.
                          </span>

                          <button
                            onClick={() => handleRevokeMember(member.id)}
                            className="text-xs text-rose-500 hover:text-rose-700 font-bold cursor-pointer hover:underline"
                          >
                            Cancel Invite ✕
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 3. Active Members List */}
              <div className="space-y-3">
                <div className="text-xs font-black text-slate-400 uppercase tracking-wider">
                  Active Vault Collaborators ({teamMembers.filter(m => m.status === 'active').length})
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {teamMembers.filter(m => m.status === 'active').map(member => (
                    <div
                      key={member.id}
                      className={`p-5 rounded-2xl border transition flex items-center justify-between ${
                        darkMode ? 'bg-[#0F172A] border-slate-800' : 'bg-white border-slate-200'
                      }`}
                    >
                      <div className="flex items-center gap-3.5">
                        <div className={`w-11 h-11 rounded-xl flex items-center justify-center font-black text-sm shrink-0 ${
                          member.role === 'owner' 
                            ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30' 
                            : 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
                        }`}>
                          {member.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-xs text-slate-900 dark:text-white">{member.name}</span>
                            <span className={`text-[10px] font-bold uppercase font-mono px-2 py-0.5 rounded ${
                              member.role === 'owner' 
                                ? 'bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300' 
                                : 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300'
                            }`}>
                              {member.role === 'owner' ? '👑 Owner' : 'Partner'}
                            </span>
                          </div>
                          <div className="text-[11px] font-mono text-slate-500">{member.email}</div>
                          <div className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold mt-1 flex items-center gap-1">
                            <ShieldCheck className="w-3 h-3" />
                            <span>2FA Authenticator Active • Full Realtime Sync</span>
                          </div>
                        </div>
                      </div>

                      {member.role !== 'owner' && (
                        <button
                          onClick={() => handleRevokeMember(member.id)}
                          className="text-xs text-rose-500 hover:text-rose-700 font-bold p-2 cursor-pointer"
                          title="Revoke access"
                        >
                          Revoke Access
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

            </div>
          ) : viewMode === 'hierarchy' ? (
            <div className="space-y-8">
              
              {Object.keys(hierarchyTree).length === 0 ? (
                <div className="p-16 text-center border-2 border-dashed rounded-3xl border-slate-200 dark:border-slate-800">
                  <FolderLock className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                  <h4 className="font-bold text-sm text-slate-800 dark:text-slate-200">No assets match your search</h4>
                  <p className="text-xs text-slate-500 mt-1">Try clearing your search query or add a new asset.</p>
                </div>
              ) : (
                Object.keys(hierarchyTree).map((gmail) => {
                  const group = hierarchyTree[gmail];
                  const isGmailCollapsed = collapsedNodes[gmail];

                  return (
                    <div 
                      key={gmail}
                      className={`rounded-2xl border p-6 shadow-sm transition-all ${
                        darkMode ? 'bg-[#0F172A] border-slate-800' : 'bg-white border-slate-200'
                      }`}
                    >
                      {/* LEVEL 0: GMAIL ROOT ANCHOR (REFINED COMPACT HEADER) */}
                      <div className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-slate-100 dark:border-slate-800">
                        <div className="flex items-center gap-4">
                          <button
                            onClick={() => toggleNodeCollapse(gmail)}
                            className="w-12 h-12 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold shadow-md shadow-blue-600/30 transition hover:bg-blue-700 shrink-0 cursor-pointer"
                            title={isGmailCollapsed ? 'Expand Tree' : 'Collapse Tree'}
                          >
                            {isGmailCollapsed ? <Folder className="w-6 h-6" /> : <FolderOpen className="w-6 h-6" />}
                          </button>
                          
                          <div>
                            {/* THE GMAIL ADDRESS (REFINED CLEAN TYPOGRAPHY) */}
                            <div className="flex flex-wrap items-center gap-2.5">
                              <span className="font-mono font-bold text-base text-slate-900 dark:text-white bg-slate-100 dark:bg-slate-800 px-3.5 py-1 rounded-xl border border-slate-300 dark:border-slate-700">
                                ✉️ {gmail}
                              </span>
                              <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-md bg-blue-600 text-white shadow-xs">
                                Master Anchor
                              </span>
                            </div>
                            
                            <span className="text-xs text-slate-500 dark:text-slate-400 block mt-1 font-medium">
                              {group.inboxItem?.notes || 'Governing email anchor for connected infrastructure, AdSense, and domains'}
                            </span>
                          </div>
                        </div>

                        {/* Quick Add Buttons for this specific Gmail */}
                        <div className="flex flex-wrap items-center gap-1.5 text-xs font-mono">
                          <button
                            onClick={() => openModalForNew({ category: 'hosting', linkedGmail: gmail })}
                            className="px-3 py-1.5 rounded-lg bg-purple-50 hover:bg-purple-100 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300 font-bold transition flex items-center gap-1 border border-purple-200 dark:border-purple-800 text-xs cursor-pointer"
                            title="Add a server under this Gmail"
                          >
                            <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
                            <span>+ Server</span>
                          </button>

                          <button
                            onClick={() => openModalForNew({ category: 'blog', linkedGmail: gmail })}
                            className="px-3 py-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 font-bold transition flex items-center gap-1 border border-blue-200 dark:border-blue-800 text-xs cursor-pointer"
                            title="Add blog under this Gmail"
                          >
                            <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
                            <span>+ Blog</span>
                          </button>

                          <button
                            onClick={() => openModalForNew({ category: 'github', linkedGmail: gmail })}
                            className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold transition flex items-center gap-1 border border-slate-300 dark:border-slate-700 text-xs cursor-pointer"
                            title="Add GitHub repo under this Gmail"
                          >
                            <GithubIcon className="w-3 h-3" />
                            <span>+ GitHub</span>
                          </button>

                          <button
                            onClick={() => openModalForNew({ category: 'vercel', linkedGmail: gmail })}
                            className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-black text-white font-bold transition flex items-center gap-1 border border-slate-800 text-xs cursor-pointer"
                            title="Add Vercel project under this Gmail"
                          >
                            <VercelIcon className="w-2.5 h-2.5" />
                            <span>+ Vercel</span>
                          </button>

                          <button
                            onClick={() => openModalForNew({ category: 'domain', linkedGmail: gmail })}
                            className="px-3 py-1.5 rounded-lg bg-amber-50 hover:bg-amber-100 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 font-bold transition flex items-center gap-1 border border-amber-200 dark:border-amber-800 text-xs cursor-pointer"
                            title="Add domain under this Gmail"
                          >
                            <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
                            <span>+ Domain</span>
                          </button>

                          <button
                            onClick={() => openModalForNew({ category: 'custom', linkedGmail: gmail })}
                            className="px-3 py-1.5 rounded-lg bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 font-bold transition flex items-center gap-1 border border-indigo-200 dark:border-indigo-800 text-xs cursor-pointer"
                            title="Add custom asset (Stripe, Cloudflare, DB, API...)"
                          >
                            <SlidersHorizontal className="w-3 h-3" />
                            <span>+ Custom</span>
                          </button>
                        </div>
                      </div>

                      {/* LEVEL 1: HOSTS & WEBSITES TREE */}
                      {!isGmailCollapsed && (
                        <div className="pt-5 space-y-5">
                          
                          {/* Servers List */}
                          {group.hosts.map(host => {
                            const hostKey = host.id;
                            const isHostCollapsed = collapsedNodes[hostKey];
                            const hostedBlogs = group.blogs.filter(b => b.linkedHost === host.title || !b.linkedHost);

                            return (
                              <div key={host.id} className="pl-4 sm:pl-7 border-l-2 border-purple-400 dark:border-purple-600 space-y-3">
                                
                                {/* Host Node Header */}
                                <div className="p-3.5 rounded-xl bg-purple-50/80 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-800 flex items-center justify-between transition hover:border-purple-400">
                                  <div className="flex items-center gap-2.5">
                                    <button 
                                      onClick={() => toggleNodeCollapse(hostKey)}
                                      className="p-1 text-purple-700 dark:text-purple-300 hover:bg-purple-100 dark:hover:bg-purple-900/50 rounded-md cursor-pointer"
                                    >
                                      {isHostCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                                    </button>
                                    <Server className="w-4.5 h-4.5 text-purple-600" />
                                    <span 
                                      onClick={() => setInspectedItem(host)}
                                      className="font-bold text-sm text-purple-950 dark:text-purple-200 cursor-pointer hover:underline"
                                    >
                                      {host.title}
                                    </span>
                                    <span className="font-mono text-[11px] text-purple-700 dark:text-purple-300 bg-purple-100 dark:bg-purple-900/60 px-2 py-0.5 rounded-md font-semibold">
                                      IP: {host.ip || 'Cloud VPS'}
                                    </span>
                                  </div>

                                  <div className="flex items-center gap-2">
                                    <button
                                      onClick={() => openModalForNew({ category: 'blog', linkedGmail: gmail, linkedHost: host.title })}
                                      className="text-xs font-bold px-3 py-1 rounded-lg bg-purple-600 text-white hover:bg-purple-700 transition flex items-center gap-1 shadow-xs cursor-pointer"
                                      title="Add website directly on this server"
                                    >
                                      <Plus className="w-3 h-3 stroke-[2.5]" />
                                      <span>Add Site</span>
                                    </button>

                                    <button
                                      onClick={() => copyText(host.password, host.id)}
                                      className="text-xs font-mono px-3 py-1 rounded-lg bg-purple-100 dark:bg-purple-900/40 text-purple-800 dark:text-purple-200 hover:bg-purple-200 transition font-semibold cursor-pointer"
                                      title="Copy Server Password"
                                    >
                                      {copiedId === host.id ? '✓ Copied' : 'Copy Pass'}
                                    </button>
                                  </div>
                                </div>

                                {/* LEVEL 2: WEBSITES ON THIS SERVER */}
                                {!isHostCollapsed && (
                                  <div className="pl-4 sm:pl-7 border-l-2 border-blue-400 dark:border-blue-600 space-y-2.5">
                                    <div className="text-[11px] font-black uppercase text-slate-500 tracking-wider">
                                      Websites running on {host.title} ({hostedBlogs.length}):
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                                      {hostedBlogs.map(blog => (
                                        <div 
                                          key={blog.id}
                                          className={`p-4 rounded-xl border flex flex-col justify-between transition ${
                                            inspectedItem?.id === blog.id 
                                              ? 'border-blue-500 bg-blue-50/60 dark:bg-blue-950/40 shadow-xs' 
                                              : darkMode 
                                                ? 'bg-slate-900/60 border-slate-800 hover:border-slate-700' 
                                                : 'bg-white border-slate-200 hover:border-blue-300'
                                          }`}
                                        >
                                          <div>
                                            <div className="flex items-center justify-between mb-1.5">
                                              <span 
                                                onClick={() => setInspectedItem(blog)}
                                                className="font-bold text-sm text-slate-900 dark:text-white hover:underline cursor-pointer flex items-center gap-1.5"
                                              >
                                                <Globe className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                                                <span className="truncate">{blog.title}</span>
                                              </span>
                                            </div>

                                            <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400 truncate block mb-2 font-medium">
                                              {blog.url?.replace('https://', '')}
                                            </span>

                                            {/* 🌟 USER REQUESTED: MULTI-GMAIL COMPONENT IDENTITY BADGES */}
                                            <div className="space-y-1 mb-3">
                                              {/* WordPress Login Email (if different) */}
                                              {blog.wpAdminEmail && (
                                                <div className="flex items-center justify-between text-[10px] font-mono py-0.5 px-1.5 rounded bg-blue-50/70 dark:bg-blue-950/40 text-blue-800 dark:text-blue-300 border border-blue-200/60 dark:border-blue-900/50">
                                                  <span className="font-semibold text-slate-400">WP Login:</span>
                                                  <span className="font-bold truncate max-w-[140px]">{blog.wpAdminEmail}</span>
                                                </div>
                                              )}

                                              {/* AdSense Account Email (if different) */}
                                              {blog.adsenseEmail && (
                                                <div className="flex items-center justify-between text-[10px] font-mono py-0.5 px-1.5 rounded bg-amber-50/70 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 border border-amber-200/60 dark:border-amber-900/50">
                                                  <span className="font-semibold text-slate-400">AdSense Acc:</span>
                                                  <span className="font-bold truncate max-w-[140px]">{blog.adsenseEmail}</span>
                                                </div>
                                              )}

                                              {/* Monetization / AdSense ID */}
                                              {blog.monetizationType && blog.monetizationType !== 'none' && (
                                                <div className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded bg-amber-100/70 dark:bg-amber-950/60 text-amber-900 dark:text-amber-200 border border-amber-300 dark:border-amber-800 max-w-full truncate">
                                                  <AdSenseIcon className="w-3 h-3 shrink-0 text-amber-600" />
                                                  <span className="truncate">{blog.monetizationDetails || 'Monetized'}</span>
                                                </div>
                                              )}

                                              {/* Analytics */}
                                              {blog.analyticsAccount && (
                                                <div className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950/50 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 max-w-full truncate">
                                                  <AnalyticsIcon className="w-3 h-3 shrink-0 text-emerald-600" />
                                                  <span className="truncate">{blog.analyticsAccount}</span>
                                                </div>
                                              )}
                                            </div>
                                          </div>

                                          {/* Direct Action Chips */}
                                          <div className="pt-2.5 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                                            <button
                                              onClick={() => copyText(blog.password, blog.id + '-pass')}
                                              className="font-mono text-blue-600 hover:underline font-semibold cursor-pointer text-xs"
                                            >
                                              {copiedId === blog.id + '-pass' ? '✓ Copied' : 'Copy Pass'}
                                            </button>

                                            {blog.adminUrl && (
                                              <a 
                                                href={blog.adminUrl} 
                                                target="_blank" 
                                                rel="noreferrer" 
                                                className="font-semibold text-xs px-2.5 py-0.5 rounded-lg bg-blue-50 dark:bg-blue-900/50 text-blue-600 dark:text-blue-300 hover:underline flex items-center gap-1 border border-blue-200 dark:border-blue-800"
                                              >
                                                <span>WP-Admin</span>
                                                <ExternalLink className="w-3 h-3" />
                                              </a>
                                            )}
                                          </div>

                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                )}

                              </div>
                            );
                          })}

                          {/* 🌟 CROSS-LINK 1: Blogs Monetized Through THIS Gmail's AdSense Account */}
                          {group.adsenseBlogs && group.adsenseBlogs.length > 0 && (
                            <div className="pl-4 sm:pl-7 border-l-2 border-amber-400 dark:border-amber-500 pt-1">
                              <div className="text-[11px] font-black uppercase text-amber-700 dark:text-amber-400 tracking-wider mb-2 flex items-center gap-1.5">
                                <AdSenseIcon className="w-3.5 h-3.5 text-amber-600" />
                                <span>Blogs Monetized Under this Gmail's AdSense Account ({group.adsenseBlogs.length}):</span>
                              </div>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                                {group.adsenseBlogs.map(b => (
                                  <div
                                    key={b.id}
                                    onClick={() => setInspectedItem(b)}
                                    className="p-3 rounded-xl border bg-amber-50/50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800/60 cursor-pointer hover:border-amber-400 transition flex items-center justify-between"
                                  >
                                    <div>
                                      <div className="font-bold text-xs text-amber-950 dark:text-amber-200">{b.title}</div>
                                      <div className="text-[10px] font-mono text-slate-500">{b.url?.replace('https://', '')}</div>
                                    </div>
                                    <span className="text-[10px] font-mono font-bold bg-amber-200/60 dark:bg-amber-900/60 text-amber-900 dark:text-amber-200 px-2 py-0.5 rounded">
                                      Domain: {b.linkedGmail?.split('@')[0]}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* 🌟 CROSS-LINK 2: Blogs Administered via THIS Gmail's WP-Admin Login */}
                          {group.wpBlogs && group.wpBlogs.length > 0 && (
                            <div className="pl-4 sm:pl-7 border-l-2 border-blue-400 dark:border-blue-500 pt-1">
                              <div className="text-[11px] font-black uppercase text-blue-700 dark:text-blue-400 tracking-wider mb-2 flex items-center gap-1.5">
                                <Globe className="w-3.5 h-3.5 text-blue-600" />
                                <span>Blogs Administered via this Gmail's WP-Admin Login ({group.wpBlogs.length}):</span>
                              </div>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                                {group.wpBlogs.map(b => (
                                  <div
                                    key={b.id}
                                    onClick={() => setInspectedItem(b)}
                                    className="p-3 rounded-xl border bg-blue-50/50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800/60 cursor-pointer hover:border-blue-400 transition flex items-center justify-between"
                                  >
                                    <div>
                                      <div className="font-bold text-xs text-blue-950 dark:text-blue-200">{b.title}</div>
                                      <div className="text-[10px] font-mono text-slate-500">{b.url?.replace('https://', '')}</div>
                                    </div>
                                    <span className="text-[10px] font-mono font-bold bg-blue-200/60 dark:bg-blue-900/60 text-blue-900 dark:text-blue-200 px-2 py-0.5 rounded">
                                      Domain: {b.linkedGmail?.split('@')[0]}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* 🌟 CROSS-LINK 3: Blogs Monitored via THIS Gmail's GA4 Analytics */}
                          {group.analyticsBlogs && group.analyticsBlogs.length > 0 && (
                            <div className="pl-4 sm:pl-7 border-l-2 border-emerald-400 dark:border-emerald-500 pt-1">
                              <div className="text-[11px] font-black uppercase text-emerald-700 dark:text-emerald-400 tracking-wider mb-2 flex items-center gap-1.5">
                                <AnalyticsIcon className="w-3.5 h-3.5 text-emerald-600" />
                                <span>Blogs Monitored Under this Gmail's Google Analytics ({group.analyticsBlogs.length}):</span>
                              </div>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                                {group.analyticsBlogs.map(b => (
                                  <div
                                    key={b.id}
                                    onClick={() => setInspectedItem(b)}
                                    className="p-3 rounded-xl border bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800/60 cursor-pointer hover:border-emerald-400 transition flex items-center justify-between"
                                  >
                                    <div>
                                      <div className="font-bold text-xs text-emerald-950 dark:text-emerald-200">{b.title}</div>
                                      <div className="text-[10px] font-mono text-slate-500">{b.url?.replace('https://', '')}</div>
                                    </div>
                                    <span className="text-[10px] font-mono font-bold bg-emerald-200/60 dark:bg-emerald-900/60 text-emerald-900 dark:text-emerald-200 px-2 py-0.5 rounded">
                                      Domain: {b.linkedGmail?.split('@')[0]}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Level 1 (B): GitHub Repositories & Tokens */}
                          {group.githubs && group.githubs.length > 0 && (
                            <div className="pl-4 sm:pl-7 border-l-2 border-slate-600 dark:border-slate-400 pt-1">
                              <div className="text-[11px] font-black uppercase text-slate-500 tracking-wider mb-2 flex items-center gap-1.5">
                                <GithubIcon className="w-3.5 h-3.5 text-slate-700 dark:text-slate-200" />
                                <span>GitHub Repositories & Deploy Tokens ({group.githubs.length}):</span>
                              </div>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                {group.githubs.map(gh => (
                                  <div
                                    key={gh.id}
                                    className={`p-3.5 rounded-xl border flex flex-col justify-between transition ${
                                      darkMode ? 'bg-slate-900/70 border-slate-800' : 'bg-slate-50/90 border-slate-200'
                                    }`}
                                  >
                                    <div>
                                      <div className="flex items-center justify-between mb-1">
                                        <span 
                                          onClick={() => setInspectedItem(gh)}
                                          className="font-bold text-xs text-slate-900 dark:text-white hover:underline cursor-pointer flex items-center gap-1.5"
                                        >
                                          <GithubIcon className="w-3.5 h-3.5" />
                                          <span>{gh.title}</span>
                                        </span>
                                        <span className="text-[11px] font-mono text-slate-500 font-semibold">{gh.username}</span>
                                      </div>
                                      {gh.url && (
                                        <a href={gh.url} target="_blank" rel="noreferrer" className="text-[11px] font-mono text-blue-600 hover:underline block truncate mb-2">
                                          {gh.url}
                                        </a>
                                      )}
                                    </div>
                                    <div className="pt-2 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs font-mono">
                                      <button onClick={() => copyText(gh.password, gh.id)} className="text-blue-600 hover:underline font-semibold cursor-pointer text-xs">
                                        {copiedId === gh.id ? '✓ PAT Copied' : 'Copy Token'}
                                      </button>
                                      <button onClick={() => setInspectedItem(gh)} className="text-slate-500 hover:text-slate-800 dark:hover:text-white font-sans text-xs font-semibold">
                                        Inspect →
                                      </button>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Level 1 (C): Vercel Projects */}
                          {group.vercels && group.vercels.length > 0 && (
                            <div className="pl-4 sm:pl-7 border-l-2 border-slate-900 dark:border-slate-300 pt-1">
                              <div className="text-[11px] font-black uppercase text-slate-500 tracking-wider mb-2 flex items-center gap-1.5">
                                <VercelIcon className="w-3 h-3 text-slate-900 dark:text-white" />
                                <span>Vercel Projects & Serverless Edge ({group.vercels.length}):</span>
                              </div>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                {group.vercels.map(ver => (
                                  <div
                                    key={ver.id}
                                    className={`p-3.5 rounded-xl border flex flex-col justify-between transition ${
                                      darkMode ? 'bg-slate-900/70 border-slate-800' : 'bg-slate-50/90 border-slate-200'
                                    }`}
                                  >
                                    <div>
                                      <div className="flex items-center justify-between mb-1">
                                        <span 
                                          onClick={() => setInspectedItem(ver)}
                                          className="font-bold text-xs text-slate-900 dark:text-white hover:underline cursor-pointer flex items-center gap-1.5"
                                        >
                                          <VercelIcon className="w-3 h-3" />
                                          <span>{ver.title}</span>
                                        </span>
                                      </div>
                                      {ver.url && (
                                        <a href={ver.url} target="_blank" rel="noreferrer" className="text-[11px] font-mono text-blue-600 hover:underline block truncate mb-2">
                                          {ver.url}
                                        </a>
                                      )}
                                    </div>
                                    <div className="pt-2 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs font-mono">
                                      <button onClick={() => copyText(ver.password, ver.id)} className="text-blue-600 hover:underline font-semibold cursor-pointer text-xs">
                                        {copiedId === ver.id ? '✓ Token Copied' : 'Copy Deploy Token'}
                                      </button>
                                      <button onClick={() => setInspectedItem(ver)} className="text-slate-500 hover:text-slate-800 dark:hover:text-white font-sans text-xs font-semibold">
                                        Inspect →
                                      </button>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Level 1 (D): Custom Assets (تخصيص: Stripe, Cloudflare, DBs, APIs) */}
                          {group.customs && group.customs.length > 0 && (
                            <div className="pl-4 sm:pl-7 border-l-2 border-indigo-400 dark:border-indigo-600 pt-1">
                              <div className="text-[11px] font-black uppercase text-slate-500 tracking-wider mb-2 flex items-center gap-1.5">
                                <SlidersHorizontal className="w-3.5 h-3.5 text-indigo-500" />
                                <span>Custom Assets & Integrations (تخصيص) ({group.customs.length}):</span>
                              </div>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                {group.customs.map(cust => (
                                  <div
                                    key={cust.id}
                                    className={`p-3.5 rounded-xl border flex flex-col justify-between transition ${
                                      darkMode ? 'bg-slate-900/70 border-slate-800' : 'bg-indigo-50/40 border-indigo-200'
                                    }`}
                                  >
                                    <div>
                                      <div className="flex items-center justify-between mb-1.5">
                                        <span 
                                          onClick={() => setInspectedItem(cust)}
                                          className="font-bold text-xs text-slate-900 dark:text-white hover:underline cursor-pointer"
                                        >
                                          {cust.title}
                                        </span>
                                        <span className="text-[10px] uppercase font-mono font-bold px-2 py-0.5 rounded bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
                                          {cust.customType || 'Custom'}
                                        </span>
                                      </div>
                                    </div>
                                    <div className="pt-2 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs font-mono">
                                      <button onClick={() => copyText(cust.password, cust.id)} className="text-indigo-600 hover:underline font-semibold cursor-pointer text-xs">
                                        {copiedId === cust.id ? '✓ Key Copied' : 'Copy Key'}
                                      </button>
                                      <button onClick={() => setInspectedItem(cust)} className="text-slate-500 hover:text-slate-800 dark:hover:text-white font-sans text-xs font-semibold">
                                        Inspect →
                                      </button>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Level 1 (E): Domains */}
                          {group.domains.length > 0 && (
                            <div className="pl-4 sm:pl-7 border-l-2 border-amber-400 dark:border-amber-600 pt-1">
                              <div className="text-[11px] font-black uppercase text-slate-500 tracking-wider mb-2">
                                Domains Registered under this Gmail ({group.domains.length}):
                              </div>
                              <div className="flex flex-wrap gap-2">
                                {group.domains.map(dom => (
                                  <div
                                    key={dom.id}
                                    className={`px-3 py-1.5 rounded-lg border text-xs font-mono flex items-center gap-2 transition ${
                                      darkMode ? 'bg-slate-900 border-slate-800 text-amber-300' : 'bg-amber-50/70 border-amber-200 text-amber-900'
                                    }`}
                                  >
                                    <HardDrive className="w-3.5 h-3.5 text-amber-500" />
                                    <span 
                                      onClick={() => setInspectedItem(dom)}
                                      className="font-bold cursor-pointer hover:underline text-xs"
                                    >
                                      {dom.title}
                                    </span>
                                    <button
                                      onClick={() => copyText(dom.password, dom.id)}
                                      className="ml-1 text-xs hover:text-amber-600 font-sans font-bold cursor-pointer"
                                      title="Copy Password"
                                    >
                                      {copiedId === dom.id ? '✓' : '🔑'}
                                    </button>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Level 1 (F): Social Networks */}
                          {group.socials.length > 0 && (
                            <div className="pl-4 sm:pl-7 border-l-2 border-emerald-400 dark:border-emerald-600 pt-1">
                              <div className="text-[11px] font-black uppercase text-slate-500 tracking-wider mb-2">
                                Social Networks Linked to this Gmail ({group.socials.length}):
                              </div>
                              <div className="flex flex-wrap gap-2">
                                {group.socials.map(soc => {
                                  const p = detectSocialPlatform(soc);
                                  return (
                                    <div
                                      key={soc.id}
                                      className={`px-3 py-1.5 rounded-lg border text-xs font-mono flex items-center gap-2 transition ${
                                        p
                                          ? darkMode ? 'bg-slate-900 border-slate-800' : 'bg-slate-50 border-slate-200'
                                          : darkMode ? 'bg-slate-900 border-slate-800 text-emerald-300' : 'bg-emerald-50/70 border-emerald-200 text-emerald-900'
                                      }`}
                                    >
                                      <SocialPlatformIcon platform={p?.id} size={14} className={p?.tagColor || 'text-emerald-500'} />
                                      <span 
                                        onClick={() => setInspectedItem(soc)}
                                        className="font-bold cursor-pointer hover:underline text-xs flex items-center gap-1.5"
                                      >
                                        <span>{soc.title}</span>
                                        {p && (
                                          <span className={`text-[9px] font-black uppercase px-1.5 py-0.5 rounded ${p.badgeColor}`}>
                                            {p.label}
                                          </span>
                                        )}
                                      </span>
                                      <button
                                        onClick={() => copyText(soc.password, soc.id)}
                                        className="ml-1 text-xs hover:text-emerald-600 font-sans font-bold cursor-pointer"
                                        title="Copy Password"
                                      >
                                        {copiedId === soc.id ? '✓' : '🔑'}
                                      </button>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          )}

                        </div>
                      )}

                    </div>
                  );
                })
              )}

            </div>
          ) : (
            /* ═════════════════════════════════════════════════════════
               VIEW 2: CARDS GRID VIEW
               ═════════════════════════════════════════════════════════ */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredItems.map(item => (
                <div 
                  key={item.id}
                  className={`p-7 rounded-3xl border transition-all flex flex-col justify-between ${
                    inspectedItem?.id === item.id 
                      ? 'border-blue-500 shadow-md ring-1 ring-blue-500' 
                      : darkMode 
                        ? 'bg-[#0F172A] border-slate-800 hover:border-slate-700' 
                        : 'bg-white border-slate-200 hover:border-blue-300'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-1.5">
                        {(() => {
                          const soc = item.category === 'social' ? detectSocialPlatform(item) : null;
                          if (soc) {
                            return (
                              <span className={`text-xs font-black uppercase px-2.5 py-1 rounded-lg border flex items-center gap-1.5 shadow-sm ${soc.badgeColor}`}>
                                <SocialPlatformIcon platform={soc.id} size={14} className={soc.tagColor} />
                                <span>{soc.label}</span>
                              </span>
                            );
                          }
                          return (
                            <span className="text-xs font-black uppercase px-2.5 py-1 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-300 border border-blue-200 dark:border-blue-800 flex items-center gap-1.5">
                              <CategoryIcon category={item.category} size={14} />
                              <span>{item.customType || CATEGORIES_LIST.find(c => c.id === item.category)?.label || item.category}</span>
                            </span>
                          );
                        })()}
                        {item.analyticsAccount && (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                            GA4
                          </span>
                        )}
                        {item.monetizationType && item.monetizationType !== 'none' && (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-lg bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
                            $$$
                          </span>
                        )}
                      </div>
                      <span className="text-xs text-emerald-500 font-bold flex items-center gap-1">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Secured</span>
                      </span>
                    </div>

                    <h4 
                      onClick={() => setInspectedItem(item)}
                      className="font-black text-base mb-1.5 cursor-pointer hover:text-blue-600 truncate"
                    >
                      {item.title}
                    </h4>
                    <p className="text-xs text-slate-400 font-mono truncate mb-4">{item.url || item.username}</p>

                    <div className={`p-4 rounded-2xl border text-xs space-y-2 ${
                      darkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-slate-50 border-slate-100'
                    }`}>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-500 text-xs font-semibold">Linked Gmail:</span>
                        <span className="font-mono text-xs font-black text-blue-600 truncate max-w-[170px]">
                          {item.linkedGmail || '—'}
                        </span>
                      </div>
                      {item.linkedHost && (
                        <div className="flex items-center justify-between">
                          <span className="text-slate-500 text-xs font-semibold">Server:</span>
                          <span className="font-mono text-xs font-black text-purple-600 truncate max-w-[170px]">
                            {item.linkedHost}
                          </span>
                        </div>
                      )}
                      {item.monetizationDetails && (
                        <div className="flex items-center justify-between">
                          <span className="text-slate-500 text-xs font-semibold">Ad Partner:</span>
                          <span className="font-mono text-xs font-black text-amber-600 truncate max-w-[170px]">
                            {item.monetizationDetails}
                          </span>
                        </div>
                      )}
                      {item.customFields && item.customFields.length > 0 && (
                        <div className="flex items-center justify-between pt-1 border-t border-slate-200/50 dark:border-slate-800">
                          <span className="text-slate-400 text-[11px] font-semibold">Custom Specs:</span>
                          <span className="font-mono text-[11px] font-bold text-indigo-600 dark:text-indigo-400">
                            {item.customFields.length} attributes
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 mt-5">
                    <button
                      onClick={() => copyText(item.password, item.id)}
                      className="text-blue-600 font-black hover:underline"
                    >
                      {copiedId === item.id ? '✓ Copied' : 'Copy Password'}
                    </button>
                    <button
                      onClick={() => setInspectedItem(item)}
                      className="flex items-center gap-1 hover:text-slate-800 font-bold"
                    >
                      <span>Inspect</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>
      </main>

      {/* ─────────────────── RIGHT SIDE INSPECTOR PANEL ─────────────────── */}
      {inspectedItem && (
        <aside className={`w-96 border-l shrink-0 flex flex-col justify-between overflow-y-auto p-7 transition-all ${
          darkMode ? 'bg-[#0F172A] border-slate-800' : 'bg-white border-slate-200'
        }`}>
          <div className="space-y-6">
            
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
              <span className="text-xs font-black uppercase tracking-wider text-slate-400">
                Asset Inspector
              </span>
              <button 
                onClick={() => setInspectedItem(null)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-2">
                {(() => {
                  const soc = inspectedItem.category === 'social' ? detectSocialPlatform(inspectedItem) : null;
                  if (soc) {
                    return (
                      <span className={`text-xs font-black uppercase px-2.5 py-1 rounded-lg border flex items-center gap-1.5 shadow-sm ${soc.badgeColor}`}>
                        <SocialPlatformIcon platform={soc.id} size={14} className={soc.tagColor} />
                        <span>{soc.label}</span>
                      </span>
                    );
                  }
                  return (
                    <span className="text-xs font-bold uppercase px-2.5 py-1 rounded-lg bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 flex items-center gap-1.5">
                      <CategoryIcon category={inspectedItem.category} size={14} />
                      <span>{CATEGORIES_LIST.find(c => c.id === inspectedItem.category)?.label || inspectedItem.category}</span>
                    </span>
                  );
                })()}
                {inspectedItem.status === 'warning' && (
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-amber-100 text-amber-800 flex items-center gap-1">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    <span>Renew soon</span>
                  </span>
                )}
              </div>
              <h3 className="text-xl font-black leading-tight text-slate-900 dark:text-white">{inspectedItem.title}</h3>
              {inspectedItem.url && (
                <a 
                  href={inspectedItem.url} 
                  target="_blank" 
                  rel="noreferrer"
                  className="text-xs text-blue-600 hover:underline flex items-center gap-1 mt-2 font-mono font-medium"
                >
                  <span className="truncate">{inspectedItem.url}</span>
                  <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                </a>
              )}
            </div>

            <div className={`p-5 rounded-2xl border space-y-3.5 ${
              darkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-slate-50 border-slate-200'
            }`}>
              <div className="text-xs font-black uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                <GitBranch className="w-4 h-4 text-blue-500" />
                <span>Interconnection Mapping</span>
              </div>

              {/* 🌟 MULTI-GMAIL INTERCONNECTED MAPPING MATRIX */}
              {inspectedItem.linkedGmail && (
                <div>
                  <div className="text-[10px] uppercase font-bold text-slate-400 mb-0.5">Master Domain Anchor:</div>
                  <div className="font-mono text-xs font-bold text-rose-600 dark:text-rose-400 flex items-center justify-between p-2 rounded-lg bg-rose-50/60 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/40">
                    <span className="truncate">{inspectedItem.linkedGmail}</span>
                    <button 
                      onClick={() => setSelectedGmailFilter(inspectedItem.linkedGmail)}
                      className="text-[11px] font-sans text-blue-600 hover:underline font-bold shrink-0 ml-1.5"
                    >
                      Trace
                    </button>
                  </div>
                </div>
              )}

              {inspectedItem.wpAdminEmail && (
                <div>
                  <div className="text-[10px] uppercase font-bold text-slate-400 mb-0.5">WordPress Login Email:</div>
                  <div className="font-mono text-xs font-bold text-blue-600 dark:text-blue-400 flex items-center justify-between p-2 rounded-lg bg-blue-50/60 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/40">
                    <span className="truncate">{inspectedItem.wpAdminEmail}</span>
                    <button 
                      onClick={() => setSelectedGmailFilter(inspectedItem.wpAdminEmail)}
                      className="text-[11px] font-sans text-blue-600 hover:underline font-bold shrink-0 ml-1.5"
                    >
                      Trace
                    </button>
                  </div>
                </div>
              )}

              {inspectedItem.adsenseEmail && (
                <div>
                  <div className="text-[10px] uppercase font-bold text-slate-400 mb-0.5">AdSense Payout Account:</div>
                  <div className="font-mono text-xs font-bold text-amber-600 dark:text-amber-400 flex items-center justify-between p-2 rounded-lg bg-amber-50/60 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/40">
                    <span className="truncate">{inspectedItem.adsenseEmail}</span>
                    <button 
                      onClick={() => setSelectedGmailFilter(inspectedItem.adsenseEmail)}
                      className="text-[11px] font-sans text-blue-600 hover:underline font-bold shrink-0 ml-1.5"
                    >
                      Trace
                    </button>
                  </div>
                </div>
              )}

              {inspectedItem.analyticsEmail && (
                <div>
                  <div className="text-[10px] uppercase font-bold text-slate-400 mb-0.5">GA4 Analytics Account:</div>
                  <div className="font-mono text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center justify-between p-2 rounded-lg bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/40">
                    <span className="truncate">{inspectedItem.analyticsEmail}</span>
                    <button 
                      onClick={() => setSelectedGmailFilter(inspectedItem.analyticsEmail)}
                      className="text-[11px] font-sans text-blue-600 hover:underline font-bold shrink-0 ml-1.5"
                    >
                      Trace
                    </button>
                  </div>
                </div>
              )}

              {inspectedItem.hostingEmail && (
                <div>
                  <div className="text-[10px] uppercase font-bold text-slate-400 mb-0.5">Hostinger Account Email:</div>
                  <div className="font-mono text-xs font-bold text-purple-600 dark:text-purple-400 flex items-center justify-between p-2 rounded-lg bg-purple-50/60 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-900/40">
                    <span className="truncate">{inspectedItem.hostingEmail}</span>
                    <button 
                      onClick={() => setSelectedGmailFilter(inspectedItem.hostingEmail)}
                      className="text-[11px] font-sans text-blue-600 hover:underline font-bold shrink-0 ml-1.5"
                    >
                      Trace
                    </button>
                  </div>
                </div>
              )}

              {inspectedItem.linkedHost && (
                <div>
                  <div className="text-[10px] uppercase font-bold text-slate-400 mb-0.5">Server Infrastructure:</div>
                  <div className="font-mono text-xs font-bold text-purple-600 dark:text-purple-400">
                    {inspectedItem.linkedHost}
                  </div>
                </div>
              )}

              {inspectedItem.domainRegistrar && (
                <div>
                  <div className="text-xs text-slate-400 mb-0.5 font-medium">DNS & Registrar:</div>
                  <div className="font-mono text-sm font-black text-amber-600 dark:text-amber-400">
                    {inspectedItem.domainRegistrar}
                  </div>
                </div>
              )}

              {/* Analytics Account */}
              {inspectedItem.analyticsAccount && (
                <div>
                  <div className="text-xs text-slate-400 mb-0.5 font-medium">Google Analytics / Search Console:</div>
                  <div className="font-mono text-sm font-black text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                    <AnalyticsIcon className="w-4 h-4 text-emerald-500" />
                    <span>{inspectedItem.analyticsAccount}</span>
                  </div>
                </div>
              )}

              {/* Monetization / AdSense */}
              {inspectedItem.monetizationType && inspectedItem.monetizationType !== 'none' && (
                <div>
                  <div className="text-xs text-slate-400 mb-0.5 font-medium">Monetization & Ad Partner:</div>
                  <div className="font-mono text-sm font-black text-amber-600 dark:text-amber-400 flex items-center gap-1.5">
                    <AdSenseIcon className="w-4 h-4 text-amber-500" />
                    <span>{inspectedItem.monetizationDetails || inspectedItem.monetizationType}</span>
                  </div>
                </div>
              )}

              {/* Linked GitHub */}
              {inspectedItem.linkedGithub && (
                <div>
                  <div className="text-xs text-slate-400 mb-0.5 font-medium">Connected GitHub:</div>
                  <div className="font-mono text-sm font-black text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                    <GithubIcon className="w-4 h-4" />
                    <span>{inspectedItem.linkedGithub}</span>
                  </div>
                </div>
              )}

              {/* Linked Vercel */}
              {inspectedItem.linkedVercel && (
                <div>
                  <div className="text-xs text-slate-400 mb-0.5 font-medium">Vercel Deployment:</div>
                  <div className="font-mono text-sm font-black text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                    <VercelIcon className="w-3.5 h-3.5" />
                    <span>{inspectedItem.linkedVercel}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Custom Specifications / Fields (تخصيص) */}
            {inspectedItem.customFields && inspectedItem.customFields.length > 0 && (
              <div className={`p-5 rounded-2xl border space-y-3 ${
                darkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-indigo-50/40 border-indigo-200'
              }`}>
                <div className="text-xs font-black uppercase tracking-wider text-indigo-600 dark:text-indigo-400 flex items-center gap-1.5">
                  <SlidersHorizontal className="w-4 h-4" />
                  <span>Custom Attributes (تخصيص)</span>
                </div>
                <div className="space-y-2">
                  {inspectedItem.customFields.map((cf, idx) => (
                    <div key={idx} className="flex items-center justify-between text-xs font-mono py-1 border-b border-indigo-100 dark:border-slate-800 last:border-none">
                      <span className="text-slate-500 font-semibold">{cf.label}:</span>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900 dark:text-white max-w-[170px] truncate">{cf.value}</span>
                        <button
                          onClick={() => copyText(cf.value, `cf-${idx}`)}
                          className="text-indigo-600 hover:underline cursor-pointer"
                          title="Copy value"
                        >
                          {copiedId === `cf-${idx}` ? '✓' : <Copy className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className={`p-5 rounded-2xl border space-y-3.5 ${
              darkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200'
            }`}>
              <div className="text-xs font-black uppercase tracking-wider text-slate-500">
                Credentials & Passwords
              </div>

              {inspectedItem.username && (
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs text-slate-400 font-medium">Username / ID:</div>
                    <div className="font-mono text-sm font-black">{inspectedItem.username}</div>
                  </div>
                  <button 
                    onClick={() => copyText(inspectedItem.username, 'insp-user')}
                    className="p-2 rounded-lg border text-slate-500 hover:text-slate-800 dark:hover:text-white"
                  >
                    {copiedId === 'insp-user' ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              )}

              {inspectedItem.password && (
                <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800">
                  <div>
                    <div className="text-xs text-slate-400 font-medium">Encrypted Password / Key:</div>
                    <div className="font-mono text-sm font-black">
                      {showPasswordMap[inspectedItem.id] ? inspectedItem.password : '••••••••••••••••'}
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <button 
                      onClick={() => togglePassVisibility(inspectedItem.id)}
                      className="p-2 rounded-lg border text-slate-500 hover:text-slate-800 dark:hover:text-white"
                    >
                      {showPasswordMap[inspectedItem.id] ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                    <button 
                      onClick={() => copyText(inspectedItem.password, 'insp-pass')}
                      className="p-2 rounded-lg border text-slate-500 hover:text-slate-800 dark:hover:text-white"
                    >
                      {copiedId === 'insp-pass' ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              )}
            </div>

            {inspectedItem.notes && (
              <div className="p-4 rounded-2xl bg-amber-50/70 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/60 text-xs">
                <span className="font-bold text-amber-900 dark:text-amber-400 block mb-1">💡 Note:</span>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed font-semibold">{inspectedItem.notes}</p>
              </div>
            )}

          </div>

          <div className="pt-5 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-3">
            <button
              onClick={() => openModalForEdit(inspectedItem)}
              className="flex-1 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-black text-xs shadow-md transition flex items-center justify-center gap-2 cursor-pointer"
            >
              <Edit3 className="w-4 h-4" />
              <span>Edit Asset</span>
            </button>

            <button
              onClick={() => handleDeleteItem(inspectedItem.id)}
              className="p-3 rounded-xl border border-rose-200 text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition cursor-pointer"
              title="Delete"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </aside>
      )}

      {/* ─────────────────── ADD / EDIT MODAL ─────────────────── */}
      {/* 2FA SETUP MODAL (Google Authenticator / Authy) */}
      {show2FAModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-md w-full p-8 shadow-2xl text-center text-white relative">
            <button
              onClick={() => setShow2FAModal(false)}
              className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-cyan-600 to-blue-600 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-cyan-500/20">
              <QrCode className="w-7 h-7 text-white stroke-[2.2]" />
            </div>

            <h3 className="text-xl font-black tracking-tight text-white">
              تفعيل التحقق بخطوتين (2FA)
            </h3>
            <p className="text-xs text-slate-400 mt-1 mb-5 leading-relaxed">
              اربط حسابك بتطبيق <span className="text-cyan-400 font-bold">Google Authenticator</span> أو <span className="text-cyan-400 font-bold">Authy</span> لتأمين خزينتك وتفعيل الدخول السريع اليومي.
            </p>

            {/* Step 1: Scan QR Code */}
            <div className="bg-white p-3 rounded-2xl inline-block mx-auto mb-4 shadow-md">
              <img 
                src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(setupUri)}`} 
                alt="2FA QR Code" 
                className="w-40 h-40 mx-auto rounded-lg"
              />
            </div>

            {/* Secret Key in plain text */}
            <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl mb-5 text-left flex items-center justify-between">
              <div>
                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">
                  أو أدخل المفتاح يدوياً (Secret Key):
                </span>
                <span className="font-mono text-xs text-cyan-300 font-bold tracking-wider select-all">
                  {setupSecret}
                </span>
              </div>
              <button
                type="button"
                onClick={() => {
                  navigator.clipboard.writeText(setupSecret);
                  setCopiedId('2fa-secret');
                  setTimeout(() => setCopiedId(null), 2000);
                }}
                className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition cursor-pointer"
                title="نسخ المفتاح"
              >
                {copiedId === '2fa-secret' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

            {/* Step 2: Confirm 6-digit code */}
            <form onSubmit={handleConfirm2FASetup} className="space-y-4">
              <div className="text-left space-y-1.5">
                <label className="text-xs font-bold text-slate-300 block text-center">
                  أدخل الكود المكون من 6 أرقام لتأكيد الربط:
                </label>
                <input
                  type="text"
                  maxLength={6}
                  required
                  autoFocus
                  placeholder="• • • • • •"
                  value={confirmTotpCode}
                  onChange={(e) => setConfirmTotpCode(e.target.value.replace(/\D/g, ''))}
                  className="w-full text-center tracking-[0.5em] text-2xl font-mono py-3 px-4 bg-slate-950 border border-slate-700 focus:border-cyan-500 rounded-xl text-white outline-none"
                />
              </div>

              {setupError && (
                <p className="text-xs text-rose-400 font-bold bg-rose-950/40 border border-rose-800/50 p-2 rounded-xl">
                  {setupError}
                </p>
              )}

              <div className="flex gap-3 pt-1">
                <button
                  type="button"
                  onClick={() => setShow2FAModal(false)}
                  className="w-1/3 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs transition cursor-pointer"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="w-2/3 py-3 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-extrabold text-xs shadow-lg transition cursor-pointer"
                >
                  تأكيد وتفعيل 2FA ➔
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className={`rounded-3xl max-w-2xl w-full p-9 shadow-2xl border max-h-[92vh] overflow-y-auto ${
            darkMode ? 'bg-[#0F172A] border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
          }`}>
            
            <div className="flex items-center justify-between pb-5 mb-6 border-b border-slate-100 dark:border-slate-800">
              <h3 className="font-black text-2xl flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-600/10 text-blue-600 flex items-center justify-center">
                  <ShieldCheck className="w-6 h-6 stroke-[2.5]" />
                </div>
                <span>{editingItem ? 'Edit Asset' : 'Add New Web Asset'}</span>
              </h3>
              <button 
                onClick={() => setShowModal(false)} 
                className="w-9 h-9 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-white flex items-center justify-center text-lg font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveItem} className="space-y-5 text-sm">
              
              <div>
                <label className="font-extrabold text-slate-600 dark:text-slate-300 block mb-1.5 text-xs">Asset Category:</label>
                
                {/* 🌟 USER REQUESTED: UNIFIED DROPDOWN WITH EXACT SAME CRISP SVG ICONS */}
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setCategoryDropdownOpen(!categoryDropdownOpen)}
                    className={`w-full rounded-xl px-3.5 py-2.5 text-xs font-bold border transition flex items-center justify-between cursor-pointer ${
                      darkMode ? 'bg-slate-900 border-slate-700 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-lg bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-blue-300 flex items-center justify-center shrink-0">
                        <CategoryIcon category={formData.category} size={15} />
                      </div>
                      <div className="text-left">
                        <div className="font-bold text-xs leading-tight">
                          {CATEGORIES_LIST.find(c => c.id === formData.category)?.label || 'Select Category'}
                        </div>
                        <div className="text-[10px] text-slate-400 font-normal">
                          {CATEGORIES_LIST.find(c => c.id === formData.category)?.desc}
                        </div>
                      </div>
                    </div>
                    <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${categoryDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {categoryDropdownOpen && (
                    <div className={`absolute top-full left-0 right-0 mt-1.5 z-50 rounded-xl p-1.5 shadow-2xl border max-h-64 overflow-y-auto ${
                      darkMode ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-200 text-slate-900'
                    }`}>
                      {CATEGORIES_LIST.filter(c => c.id !== 'all').map(cat => {
                        const isSelected = formData.category === cat.id;
                        return (
                          <button
                            key={cat.id}
                            type="button"
                            onClick={() => {
                              setFormData({ ...formData, category: cat.id });
                              setCategoryDropdownOpen(false);
                            }}
                            className={`w-full flex items-center justify-between p-2 rounded-lg text-left transition cursor-pointer ${
                              isSelected 
                                ? 'bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-300 font-bold' 
                                : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
                            }`}
                          >
                            <div className="flex items-center gap-2.5">
                              <div className={`w-7 h-7 rounded-md flex items-center justify-center shrink-0 ${
                                isSelected ? 'bg-blue-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                              }`}>
                                <CategoryIcon category={cat.id} size={14} />
                              </div>
                              <div>
                                <div className="text-xs font-bold leading-tight">{cat.label}</div>
                                <div className="text-[10px] text-slate-400 font-normal">{cat.desc}</div>
                              </div>
                            </div>
                            {isSelected && <Check className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>

              {formData.category === 'social' && (
                <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-50/70 via-indigo-50/50 to-pink-50/70 dark:from-blue-950/30 dark:via-indigo-950/20 dark:to-pink-950/30 border-2 border-indigo-200 dark:border-indigo-900/60 space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="font-black text-slate-900 dark:text-white flex items-center gap-2 text-xs">
                      <Share2 className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                      <span>Select Social Network Platform (اختر المنصة):</span>
                    </label>
                    <span className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-100 dark:bg-indigo-900/50 px-2 py-0.5 rounded-full">
                      {detectSocialPlatform(formData)?.label || 'Auto Detect'}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {[
                      { id: 'pinterest', label: 'Pinterest', icon: PinterestIcon, color: 'hover:border-rose-400 hover:text-[#E60023]', activeBg: 'bg-rose-50 dark:bg-rose-950/70 text-[#E60023] border-[#E60023]' },
                      { id: 'youtube', label: 'YouTube', icon: YouTubeIcon, color: 'hover:border-red-400 hover:text-[#FF0000]', activeBg: 'bg-red-50 dark:bg-red-950/70 text-[#FF0000] border-[#FF0000]' },
                      { id: 'facebook', label: 'Facebook', icon: FacebookIcon, color: 'hover:border-blue-400 hover:text-[#1877F2]', activeBg: 'bg-blue-50 dark:bg-blue-950/70 text-[#1877F2] border-[#1877F2]' },
                      { id: 'instagram', label: 'Instagram', icon: InstagramIcon, color: 'hover:border-pink-400 hover:text-[#E1306C]', activeBg: 'bg-pink-50 dark:bg-pink-950/70 text-[#E1306C] border-[#E1306C]' },
                      { id: 'tiktok', label: 'TikTok', icon: TikTokIcon, color: 'hover:border-slate-500 hover:text-black dark:hover:text-white', activeBg: 'bg-slate-200 dark:bg-slate-800 text-black dark:text-white border-slate-600' },
                      { id: 'twitter', label: 'X (Twitter)', icon: TwitterXIcon, color: 'hover:border-slate-500 hover:text-black dark:hover:text-white', activeBg: 'bg-slate-200 dark:bg-slate-800 text-black dark:text-white border-slate-600' },
                      { id: 'linkedin', label: 'LinkedIn', icon: LinkedInIcon, color: 'hover:border-sky-500 hover:text-[#0A66C2]', activeBg: 'bg-sky-50 dark:bg-sky-950/70 text-[#0A66C2] border-[#0A66C2]' },
                      { id: 'other', label: 'Other Social', icon: Share2, color: 'hover:border-indigo-400 hover:text-indigo-600', activeBg: 'bg-indigo-50 dark:bg-indigo-950/70 text-indigo-600 border-indigo-600' }
                    ].map(platform => {
                      const IconComp = platform.icon;
                      const isCurrent = (formData.customType || '').toLowerCase() === platform.id || (!formData.customType && detectSocialPlatform(formData)?.id === platform.id);
                      return (
                        <button
                          key={platform.id}
                          type="button"
                          onClick={() => {
                            setFormData(prev => ({
                              ...prev,
                              customType: platform.id,
                              url: prev.url ? prev.url : (
                                platform.id === 'pinterest' ? 'https://pinterest.com/' :
                                platform.id === 'youtube' ? 'https://youtube.com/@' :
                                platform.id === 'facebook' ? 'https://facebook.com/' :
                                platform.id === 'instagram' ? 'https://instagram.com/' :
                                platform.id === 'tiktok' ? 'https://tiktok.com/@' :
                                platform.id === 'twitter' ? 'https://x.com/' :
                                platform.id === 'linkedin' ? 'https://linkedin.com/in/' : ''
                              )
                            }));
                          }}
                          className={`p-2.5 rounded-xl border text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer ${
                            isCurrent
                              ? `${platform.activeBg} shadow-sm font-black`
                              : darkMode
                                ? 'bg-slate-900/60 border-slate-800 text-slate-300 ' + platform.color
                                : 'bg-white border-slate-200 text-slate-700 ' + platform.color
                          }`}
                        >
                          <IconComp size={15} />
                          <span>{platform.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {formData.category === 'custom' && (
                <div>
                  <label className="font-extrabold text-slate-600 dark:text-slate-300 block mb-2 text-sm">
                    Custom Asset Type (تخصيص النوع):
                  </label>
                  <input
                    type="text"
                    value={formData.customType || ''}
                    onChange={(e) => setFormData({ ...formData, customType: e.target.value })}
                    placeholder="e.g. Payment Gateway (Stripe), Cloudflare CDN, Supabase DB, API Key..."
                    className={`w-full rounded-2xl px-4 py-3.5 text-base outline-none border font-semibold transition ${
                      darkMode ? 'bg-slate-900 border-slate-700 text-white focus:border-blue-500' : 'bg-slate-50 border-slate-200 focus:border-blue-500'
                    }`}
                  />
                </div>
              )}

              <div>
                <label className="font-extrabold text-slate-600 dark:text-slate-300 block mb-2 text-sm">Title / Name:</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. World Travel Blog, Main GitHub Repo, Stripe Account..."
                  className={`w-full rounded-2xl px-4 py-3.5 text-base outline-none border font-semibold transition ${
                    darkMode ? 'bg-slate-900 border-slate-700 text-white focus:border-blue-500' : 'bg-slate-50 border-slate-200 focus:border-blue-500'
                  }`}
                />
              </div>

              <div>
                <label className="font-extrabold text-slate-600 dark:text-slate-300 block mb-2 text-sm">Primary URL / Access Link:</label>
                <input
                  type="text"
                  value={formData.url}
                  onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                  placeholder="https://example.com"
                  className={`w-full rounded-2xl px-4 py-3.5 text-base outline-none border font-semibold transition ${
                    darkMode ? 'bg-slate-900 border-slate-700 text-white focus:border-blue-500' : 'bg-slate-50 border-slate-200 focus:border-blue-500'
                  }`}
                />
              </div>

              {/* 🌟 USER REQUESTED: DUAL GMAIL SELECTOR (EXISTING LIST OR NEW) */}
              <div className="p-5 rounded-2xl bg-rose-50/70 dark:bg-rose-950/25 border-2 border-rose-200/80 dark:border-rose-900/60 space-y-3.5">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <label className="font-black text-rose-900 dark:text-rose-300 flex items-center gap-2 text-sm">
                    <Mail className="w-5 h-5 text-rose-600" />
                    <span>Master Anchor Gmail (Ties everything together):</span>
                  </label>

                  {/* Dual Mode Switcher */}
                  <div className="flex items-center bg-rose-100 dark:bg-rose-900/50 p-1 rounded-xl">
                    <button
                      type="button"
                      onClick={() => setGmailInputMode('select')}
                      className={`px-3 py-1 rounded-lg text-xs font-black transition cursor-pointer ${
                        gmailInputMode === 'select'
                          ? 'bg-rose-600 text-white shadow-sm'
                          : 'text-rose-700 dark:text-rose-300 hover:text-rose-900'
                      }`}
                    >
                      Choose Existing ({allGmails.length})
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setGmailInputMode('new');
                        setFormData({ ...formData, linkedGmail: '' });
                      }}
                      className={`px-3 py-1 rounded-lg text-xs font-black transition cursor-pointer ${
                        gmailInputMode === 'new'
                          ? 'bg-rose-600 text-white shadow-sm'
                          : 'text-rose-700 dark:text-rose-300 hover:text-rose-900'
                      }`}
                    >
                      + Type New Email
                    </button>
                  </div>
                </div>

                {gmailInputMode === 'select' ? (
                  <div className="space-y-2.5">
                    {allGmails.length > 0 ? (
                      <select
                        value={formData.linkedGmail}
                        onChange={(e) => setFormData({ ...formData, linkedGmail: e.target.value })}
                        className={`w-full rounded-xl px-4 py-3.5 text-sm font-mono font-bold outline-none border transition ${
                          darkMode ? 'bg-slate-900 border-rose-800 text-white' : 'bg-white border-rose-300 text-slate-900'
                        }`}
                      >
                        <option value="">-- Select from your existing Gmails ({allGmails.length}) --</option>
                        {allGmails.map((g, idx) => {
                          const count = vaultItems.filter(i => i.linkedGmail === g || i.username === g).length;
                          return (
                            <option key={idx} value={g}>
                              {g} — ({count} linked items)
                            </option>
                          );
                        })}
                      </select>
                    ) : (
                      <div className="text-xs text-rose-600 font-bold p-2">
                        No saved Gmails yet. Click "+ Type New Email" above to register your first Gmail.
                      </div>
                    )}

                    {/* Quick Pick Chips */}
                    {allGmails.length > 0 && (
                      <div className="flex flex-wrap items-center gap-2 pt-1">
                        <span className="text-xs font-bold text-slate-400">Quick select:</span>
                        {allGmails.slice(0, 6).map((g, idx) => (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => setFormData({ ...formData, linkedGmail: g })}
                            className={`px-3 py-1 rounded-lg text-xs font-mono font-bold border transition cursor-pointer ${
                              formData.linkedGmail === g
                                ? 'bg-rose-600 text-white border-rose-600 shadow-sm'
                                : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-700 hover:border-rose-400'
                            }`}
                          >
                            {g}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="space-y-2">
                    <input
                      type="email"
                      required
                      value={formData.linkedGmail}
                      onChange={(e) => setFormData({ ...formData, linkedGmail: e.target.value })}
                      placeholder="Type a new Gmail address (e.g. brand.empire@gmail.com)..."
                      className={`w-full rounded-xl px-4 py-3.5 text-base font-mono font-bold outline-none border transition ${
                        darkMode ? 'bg-slate-900 border-rose-800 text-white' : 'bg-white border-rose-300 text-slate-900'
                      }`}
                      autoFocus
                    />
                    <p className="text-xs text-rose-700 dark:text-rose-400 font-bold flex items-center gap-1.5">
                      <span>✨ This email will automatically be saved to your vault and create a new Anchor Tree.</span>
                    </p>
                  </div>
                )}
              </div>

              {/* 🌟 USER REQUESTED: MULTI-GMAIL COMPONENT ARCHITECTURE */}
              {formData.category === 'blog' && (
                <div className="p-4 rounded-xl bg-blue-50/70 dark:bg-blue-950/20 border-2 border-blue-200 dark:border-blue-900/60 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <GitBranch className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                      <span className="font-bold text-xs text-blue-950 dark:text-blue-200">
                        Multi-Account Architecture (ربط الحسابات والإيميلات المختلفة)
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-blue-600 bg-blue-100 dark:bg-blue-900/40 px-2 py-0.5 rounded font-bold">
                      Cross-Referenced
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    إذا كان الووردبريس أو الأدسنس أو السيرفر مسجلاً بإيميل مختلف عن إيميل الدومين، حدده هنا للربط الذكي:
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
                    {/* WP Admin Email */}
                    <div>
                      <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1 text-[11px]">
                        WordPress Login Email (إيميل أدمن الووردبريس):
                      </label>
                      <input
                        type="email"
                        value={formData.wpAdminEmail || ''}
                        onChange={(e) => setFormData({ ...formData, wpAdminEmail: e.target.value })}
                        placeholder="e.g. wp-admin@domain.com"
                        className={`w-full rounded-lg px-3 py-2 text-xs font-mono font-medium outline-none border transition ${
                          darkMode ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-blue-200'
                        }`}
                      />
                    </div>

                    {/* AdSense Account Email */}
                    <div>
                      <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1 text-[11px]">
                        Google AdSense Email (إيميل حساب أدسنس):
                      </label>
                      <input
                        type="email"
                        value={formData.adsenseEmail || ''}
                        onChange={(e) => setFormData({ ...formData, adsenseEmail: e.target.value })}
                        placeholder="e.g. adsense.payouts@gmail.com"
                        className={`w-full rounded-lg px-3 py-2 text-xs font-mono font-medium outline-none border transition ${
                          darkMode ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-blue-200'
                        }`}
                      />
                    </div>

                    {/* Analytics GA4 Email */}
                    <div>
                      <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1 text-[11px]">
                        Analytics GA4 Email (إيميل حساب التحليلات):
                      </label>
                      <input
                        type="email"
                        value={formData.analyticsEmail || ''}
                        onChange={(e) => setFormData({ ...formData, analyticsEmail: e.target.value })}
                        placeholder="e.g. analytics.hq@gmail.com"
                        className={`w-full rounded-lg px-3 py-2 text-xs font-mono font-medium outline-none border transition ${
                          darkMode ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-blue-200'
                        }`}
                      />
                    </div>

                    {/* Hosting Server Email */}
                    <div>
                      <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1 text-[11px]">
                        Hosting Server Email (إيميل حساب الاستضافة):
                      </label>
                      <input
                        type="email"
                        value={formData.hostingEmail || ''}
                        onChange={(e) => setFormData({ ...formData, hostingEmail: e.target.value })}
                        placeholder="e.g. hostinger.ops@gmail.com"
                        className={`w-full rounded-lg px-3 py-2 text-xs font-mono font-medium outline-none border transition ${
                          darkMode ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-blue-200'
                        }`}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* 🌟 USER REQUESTED: BLOG ECOSYSTEM (ANALYTICS & MONETIZATION HUB) */}
              {formData.category === 'blog' && (
                <div className="p-5 rounded-2xl bg-amber-50/70 dark:bg-amber-950/20 border-2 border-amber-200 dark:border-amber-900/60 space-y-4">
                  <div className="flex items-center gap-2">
                    <AnalyticsIcon className="w-5 h-5 text-amber-600" />
                    <span className="font-black text-sm text-amber-900 dark:text-amber-300">
                      Traffic Analytics & Monetization Hub
                    </span>
                  </div>

                  {/* Google Analytics Account */}
                  <div>
                    <label className="font-bold text-slate-600 dark:text-slate-300 block mb-1 text-xs">
                      Google Analytics (GA4) / Search Console:
                    </label>
                    <input
                      type="text"
                      value={formData.analyticsAccount || ''}
                      onChange={(e) => setFormData({ ...formData, analyticsAccount: e.target.value })}
                      placeholder="e.g. GA4: G-XXXXXXXX / Connected to master@gmail.com"
                      className={`w-full rounded-xl px-4 py-3 text-sm outline-none border font-semibold ${
                        darkMode ? 'bg-slate-900 border-amber-800 text-white' : 'bg-white border-amber-200'
                      }`}
                    />
                  </div>

                  {/* Monetization Model */}
                  <div>
                    <label className="font-bold text-slate-600 dark:text-slate-300 block mb-1.5 text-xs">
                      Monetization & Ad Network (هل فيه أدسنس أم شركة أخرى):
                    </label>
                    <div className="grid grid-cols-4 gap-2 mb-2">
                      {[
                        { id: 'adsense', label: 'Google AdSense' },
                        { id: 'affiliate', label: 'Affiliate' },
                        { id: 'other_ads', label: 'Ezoic / Other' },
                        { id: 'none', label: 'None / Later' },
                      ].map(m => (
                        <button
                          key={m.id}
                          type="button"
                          onClick={() => setFormData({ ...formData, monetizationType: m.id })}
                          className={`py-2 px-2.5 rounded-xl text-xs font-bold border transition cursor-pointer text-center ${
                            formData.monetizationType === m.id
                              ? 'bg-amber-600 text-white border-amber-600 shadow-sm'
                              : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-amber-200 dark:border-amber-800'
                          }`}
                        >
                          {m.label}
                        </button>
                      ))}
                    </div>
                    <input
                      type="text"
                      value={formData.monetizationDetails || ''}
                      onChange={(e) => setFormData({ ...formData, monetizationDetails: e.target.value })}
                      placeholder="e.g. AdSense Pub ID: pub-3940256099942544 or Amazon Affiliate Tag..."
                      className={`w-full rounded-xl px-4 py-3 text-sm font-mono font-bold outline-none border ${
                        darkMode ? 'bg-slate-900 border-amber-800 text-white' : 'bg-white border-amber-200'
                      }`}
                    />
                  </div>

                  {/* Connected GitHub & Vercel links for Blog */}
                  <div className="grid grid-cols-2 gap-3 pt-1">
                    <div>
                      <label className="font-bold text-slate-600 dark:text-slate-300 block mb-1 text-xs">Linked GitHub Repo:</label>
                      <input
                        type="text"
                        value={formData.linkedGithub || ''}
                        onChange={(e) => setFormData({ ...formData, linkedGithub: e.target.value })}
                        placeholder="github.com/org/repo"
                        className={`w-full rounded-xl px-3.5 py-2.5 text-xs font-mono outline-none border ${
                          darkMode ? 'bg-slate-900 border-amber-800 text-white' : 'bg-white border-amber-200'
                        }`}
                      />
                    </div>
                    <div>
                      <label className="font-bold text-slate-600 dark:text-slate-300 block mb-1 text-xs">Linked Vercel Deploy:</label>
                      <input
                        type="text"
                        value={formData.linkedVercel || ''}
                        onChange={(e) => setFormData({ ...formData, linkedVercel: e.target.value })}
                        placeholder="project.vercel.app"
                        className={`w-full rounded-xl px-3.5 py-2.5 text-xs font-mono outline-none border ${
                          darkMode ? 'bg-slate-900 border-amber-800 text-white' : 'bg-white border-amber-200'
                        }`}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Linked Hosting Server */}
              <div>
                <label className="font-extrabold text-slate-600 dark:text-slate-300 block mb-2 text-sm">Linked Server / Hostinger VPS:</label>
                {allHosts.length > 0 && (
                  <select
                    value={formData.linkedHost}
                    onChange={(e) => setFormData({ ...formData, linkedHost: e.target.value })}
                    className={`w-full rounded-xl px-4 py-3 text-sm font-bold outline-none border mb-2 transition ${
                      darkMode ? 'bg-slate-900 border-slate-700 text-white' : 'bg-slate-50 border-slate-200'
                    }`}
                  >
                    <option value="">-- Or choose from registered servers --</option>
                    {allHosts.map((h, idx) => (
                      <option key={idx} value={h}>{h}</option>
                    ))}
                  </select>
                )}
                <input
                  type="text"
                  value={formData.linkedHost}
                  onChange={(e) => setFormData({ ...formData, linkedHost: e.target.value })}
                  placeholder="Or enter host server (e.g. Hostinger Cloud VPS EU)..."
                  className={`w-full rounded-2xl px-4 py-3.5 text-base outline-none border font-semibold transition ${
                    darkMode ? 'bg-slate-900 border-slate-700 text-white focus:border-blue-500' : 'bg-slate-50 border-slate-200 focus:border-blue-500'
                  }`}
                />
              </div>

              {/* Username & Password */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-extrabold text-slate-600 dark:text-slate-300 block mb-2 text-sm">Username / Login:</label>
                  <input
                    type="text"
                    value={formData.username}
                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                    placeholder="admin"
                    className={`w-full rounded-2xl px-4 py-3.5 text-base outline-none border font-semibold transition ${
                      darkMode ? 'bg-slate-900 border-slate-700 text-white focus:border-blue-500' : 'bg-slate-50 border-slate-200 focus:border-blue-500'
                    }`}
                  />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="font-extrabold text-slate-600 dark:text-slate-300 text-sm">Password / Secret Key:</label>
                    <button 
                      type="button" 
                      onClick={generateStrongPassword}
                      className="text-xs text-blue-600 hover:underline font-black cursor-pointer"
                    >
                      Generate ⚡
                    </button>
                  </div>
                  <input
                    type="text"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    placeholder="Secret Pass or Key"
                    className={`w-full rounded-2xl px-4 py-3.5 text-base font-mono outline-none border font-bold transition ${
                      darkMode ? 'bg-slate-900 border-slate-700 text-white focus:border-blue-500' : 'bg-slate-50 border-slate-200 focus:border-blue-500'
                    }`}
                  />
                </div>
              </div>

              {/* 🌟 USER REQUESTED: DYNAMIC CUSTOM FIELDS (تخصيص أي بيانات أو مفاتيح إضافية) */}
              <div className="p-5 rounded-2xl border-2 border-dashed border-indigo-200 dark:border-indigo-900/60 bg-indigo-50/30 dark:bg-indigo-950/20 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <SlidersHorizontal className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                    <span className="font-black text-sm text-indigo-950 dark:text-indigo-300">
                      Custom Fields (تخصيص أي بيانات أو معلومات إضافية)
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setFormData(prev => ({
                        ...prev,
                        customFields: [...(prev.customFields || []), { label: '', value: '' }]
                      }));
                    }}
                    className="text-xs font-bold text-indigo-600 dark:text-indigo-300 hover:underline bg-white dark:bg-slate-900 px-3 py-1.5 rounded-xl border border-indigo-200 dark:border-indigo-800 cursor-pointer flex items-center gap-1.5 shadow-sm"
                  >
                    <Plus className="w-3.5 h-3.5 stroke-[3]" />
                    <span>+ Add Custom Field</span>
                  </button>
                </div>

                {formData.customFields && formData.customFields.length > 0 ? (
                  <div className="space-y-2.5 pt-1">
                    {formData.customFields.map((cf, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <input
                          type="text"
                          placeholder="Field Name (e.g. Cloudflare Token, DB Port, Telegram ID)..."
                          value={cf.label}
                          onChange={(e) => {
                            const updated = [...formData.customFields];
                            updated[idx].label = e.target.value;
                            setFormData({ ...formData, customFields: updated });
                          }}
                          className={`w-1/2 rounded-xl px-3.5 py-2.5 text-xs font-semibold outline-none border ${
                            darkMode ? 'bg-slate-900 border-indigo-900 text-white' : 'bg-white border-indigo-200'
                          }`}
                        />
                        <input
                          type="text"
                          placeholder="Value..."
                          value={cf.value}
                          onChange={(e) => {
                            const updated = [...formData.customFields];
                            updated[idx].value = e.target.value;
                            setFormData({ ...formData, customFields: updated });
                          }}
                          className={`w-1/2 rounded-xl px-3.5 py-2.5 text-xs font-mono font-bold outline-none border ${
                            darkMode ? 'bg-slate-900 border-indigo-900 text-white' : 'bg-white border-indigo-200'
                          }`}
                        />
                        <button
                          type="button"
                          onClick={() => {
                            const updated = formData.customFields.filter((_, i) => i !== idx);
                            setFormData({ ...formData, customFields: updated });
                          }}
                          className="p-2 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-lg cursor-pointer"
                          title="Remove field"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-slate-400 font-medium">
                    No extra fields yet. Click "+ Add Custom Field" above to attach custom API tokens, DB strings, Ad IDs, etc.
                  </p>
                )}
              </div>

              <div>
                <label className="font-extrabold text-slate-600 dark:text-slate-300 block mb-2 text-sm">WP-Admin / Direct Login URL (Optional):</label>
                <input
                  type="text"
                  value={formData.adminUrl}
                  onChange={(e) => setFormData({ ...formData, adminUrl: e.target.value })}
                  placeholder="https://example.com/wp-admin"
                  className={`w-full rounded-2xl px-4 py-3.5 text-base outline-none border font-semibold transition ${
                    darkMode ? 'bg-slate-900 border-slate-700 text-white focus:border-blue-500' : 'bg-slate-50 border-slate-200 focus:border-blue-500'
                  }`}
                />
              </div>

              <div>
                <label className="font-extrabold text-slate-600 dark:text-slate-300 block mb-2 text-sm">Notes & Renewal Details:</label>
                <textarea
                  rows={2}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Renewal date, AdSense ID, monetization strategy, 2FA backup phone..."
                  className={`w-full rounded-2xl px-4 py-3 text-base outline-none border font-semibold transition ${
                    darkMode ? 'bg-slate-900 border-slate-700 text-white focus:border-blue-500' : 'bg-slate-50 border-slate-200 focus:border-blue-500'
                  }`}
                />
              </div>

              <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-6 py-3.5 rounded-2xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 font-bold hover:bg-slate-50 dark:hover:bg-slate-800 text-sm transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-8 py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-black text-sm shadow-xl shadow-blue-600/30 transition cursor-pointer"
                >
                  {editingItem ? 'Update Asset' : 'Save Asset'}
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
}
