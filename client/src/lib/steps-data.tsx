import {
  Info,
  Globe,
  TrendingUp,
  ClipboardList,
  LogIn,
  Building,
  Tags,
  MapPin,
  Phone,
  ShieldCheck,
  Clock,
  Calendar,
  Camera,
  Send,
  ArrowRight,
  Lock,
  CheckSquare
} from "lucide-react";

export interface StepDef {
  id: number;
  title: string;
  description: string;
  icon: React.ElementType;
  type: "info" | "choice" | "checklist" | "form" | "final";
  content?: any;
}

export const STEPS: StepDef[] = [
  {
    id: 1,
    title: "Introduction",
    description: "Understand how Google Business Profile works with GoodTherapy",
    icon: Info,
    type: "info",
    content: {
      paragraphs: [
        "Your GoodTherapy profile already helps people understand who you are and how you work. A Google Business Profile (GBP) helps more people find you in Google Search and Google Maps, then click through to your GoodTherapy profile.",
        "When your GBP points to your GoodTherapy profile, you create a cleaner path for referrals: people find you on Google, then read your full, trusted profile on GoodTherapy before contacting you."
      ],
      heading: "This guide will help you:",
      list: [
        "create or claim your Google Business Profile",
        "add your GoodTherapy link in the right places",
        "send your public GBP link to GoodTherapy so we can connect it to your listing"
      ]
    }
  },
  {
    id: 2,
    title: "What is a Google Business Profile?",
    description: "Learn what a GBP is and where it appears",
    icon: Globe,
    type: "info",
    content: {
      intro: "A Google Business Profile is a free listing that can show up in:",
      list: [
        "Google Search",
        "Google Maps"
      ],
      paragraphs: [
        "It can show key details like your name, phone, hours, location or service area, photos, and a website link. The \"website\" or \"appointment\" link is where we want your GoodTherapy profile to be featured, so people land on your full profile before reaching out."
      ]
    }
  },
  {
    id: 3,
    title: "Why this supports your GoodTherapy referrals",
    description: "Understand the referral path you're building",
    icon: TrendingUp,
    type: "info",
    content: {
      paragraphs: [
        "A complete Google listing helps Google match you to relevant searches and display accurate information. It also helps people trust what they see because your details look consistent across platforms. Google's own guidance puts a lot of weight on accurate info (name, category, address or service area)."
      ],
      heading: "The simple referral path you are building is:",
      flowSteps: [
        "Google Search or Maps",
        "your Google listing",
        "your GoodTherapy profile",
        "contact/request"
      ]
    }
  },
  {
    id: 4,
    title: "Before you start: gather your details",
    description: "Have these ready so setup is fast and smooth",
    icon: ClipboardList,
    type: "checklist",
    content: {
      intro: "Have these ready so setup is fast and smooth:",
      items: [
        "Practice name (the exact version you want public)",
        "Address (only if clients can visit during stated hours) or your service area",
        "Phone number for new inquiries",
        "A Google account you will keep long term (Gmail or Workspace)",
        "Your GoodTherapy profile link"
      ],
      note: "If you do not see clients at your address, you should set your profile up as a service-area business and not display a street address."
    }
  },
  {
    id: 5,
    title: "Sign in and start the profile",
    description: "Get started with Google Business Profile",
    icon: LogIn,
    type: "info",
    content: {
      steps: [
        "Go to Google Business Profile sign-in: business.google.com/create",
        "Click \"Manage now\" or sign in",
        "Use the Google account you want to manage this long term"
      ],
      tip: "Use an account you will not lose access to. This account controls your listing."
    }
  },
  {
    id: 6,
    title: "Add your practice name",
    description: "Claim or create your business listing",
    icon: Building,
    type: "info",
    content: {
      steps: [
        "Type your practice name",
        "If Google suggests an existing listing, select it. You may be claiming a profile that already exists.",
        "If nothing matches, choose \"Create a business with this name\"",
        "Continue"
      ],
      tip: "Keep the name consistent with how you present it elsewhere (GoodTherapy, your voicemail greeting, your email signature). Google recommends representing your business consistently in the real world."
    }
  },
  {
    id: 7,
    title: "Choose your business category",
    description: "This matters a lot for search visibility",
    icon: Tags,
    type: "info",
    content: {
      steps: [
        "In \"Business category,\" start typing and pick the closest match from Google's list",
        "Choose the most accurate main category first",
        "Add only a few additional categories if they truly fit"
      ],
      paragraphs: [
        "Google's guidance is to use a small number of categories that describe your core business. Do not add a category for every service."
      ],
      tip: "Think \"This business IS a...\" not \"This business offers...\" If you are unsure, pick the closest match now. You can change categories later."
    }
  },
  {
    id: 8,
    title: "Set how your location is displayed",
    description: "Address vs service area decision",
    icon: MapPin,
    type: "choice",
    content: {
      question: "Google will ask if customers can visit you at a location.",
      options: [
        {
          label: "Yes - clients can visit my office",
          description: "Choose \"Yes,\" enter your office address (match what you use on GoodTherapy), and check the map pin is correct"
        },
        {
          label: "No - service-area business",
          description: "Choose \"No,\" add your service area (city/region where you serve clients), and continue"
        }
      ],
      note: "Google's rule of thumb: only hide your address if you are truly a service-area business. If you hide it, your profile shows your service area instead of a street address."
    }
  },
  {
    id: 9,
    title: "Add contact details and your GoodTherapy link",
    description: "Connect your profile to GoodTherapy",
    icon: Phone,
    type: "info",
    content: {
      steps: [
        "Add the phone number you want for new inquiries",
        "For \"Website,\" use: your GoodTherapy profile link (if you do not have a separate practice website, or if you want GoodTherapy to be the main destination)",
        "Save and continue"
      ],
      tip: "Consistency helps. Use the same phone number and location/service area wherever possible so people do not get confused."
    }
  },
  {
    id: 10,
    title: "Verify your practice",
    description: "Do not skip this critical step",
    icon: ShieldCheck,
    type: "info",
    content: {
      intro: "Verification helps confirm your practice is legitimate and unlocks full editing control.",
      paragraphs: [
        "Google decides which verification methods you get. You cannot force a specific option, and sometimes you may need more than one method."
      ],
      heading: "Common methods you may see:",
      methods: [
        { name: "Postcard", steps: "confirm the address, request it, then enter the code when it arrives" },
        { name: "Phone or text", steps: "enter the code you receive" },
        { name: "Email", steps: "enter the code you receive" },
        { name: "Video recording", steps: "follow Google's steps and record what they request" }
      ],
      tip: "If verification fails, double-check that your name, category, and address/service area are accurate and not stuffed with extra keywords. Google can restrict profiles that do not follow guidelines."
    }
  },
  {
    id: 11,
    title: "Fill in key practice details",
    description: "The \"trust builders\"",
    icon: Clock,
    type: "info",
    content: {
      sections: [
        {
          heading: "1) Hours",
          bullets: [
            "Set hours that reflect when you respond to new inquiries",
            "If you are appointment-only, you can still set general hours and keep it simple"
          ]
        },
        {
          heading: "2) Business description",
          paragraphs: [
            "Write a short, clear description. Keep it readable. Include who you help and how you work, then point to GoodTherapy for full details. Many guides note the description is limited and works best when it is clear and client-focused."
          ],
          example: "\"I offer online and in-person therapy for adults. I support people with anxiety, stress, depression, and relationship concerns. For my approach, fees, and how to contact me, please visit my GoodTherapy profile: [link].\""
        }
      ],
      tip: "Avoid listing sensitive details. Keep it general."
    }
  },
  {
    id: 12,
    title: "Add your GoodTherapy profile as appointment link",
    description: "Use the booking link feature if available",
    icon: Calendar,
    type: "info",
    content: {
      intro: "If Google shows \"Bookings\" or \"Appointment links,\" use it.",
      steps: [
        "Search your business name on Google while logged into the right account",
        "Click \"Edit profile\" or \"Bookings\"",
        "Add your GoodTherapy profile link as the booking or appointment link",
        "Save"
      ],
      paragraphs: [
        "Google supports adding booking links, including adding your own link."
      ],
      tip: "If you do not see \"Bookings,\" do not worry. Not every profile has the same options. Your \"Website\" link to GoodTherapy still does the job."
    }
  },
  {
    id: 13,
    title: "Add photos or a logo",
    description: "Keep it simple and professional",
    icon: Camera,
    type: "info",
    content: {
      intro: "Photos can increase comfort and trust because people can \"recognize\" you or your office before reaching out.",
      heading: "Good options:",
      list: [
        "Professional headshot",
        "Practice logo",
        "Office exterior (if you meet in person)",
        "Office interior (waiting area or room, no client items visible)"
      ],
      privacyTip: "Never post client photos or anything that could identify a client."
    }
  },
  {
    id: 14,
    title: "Send your public GBP link to GoodTherapy",
    description: "Connect your profiles together",
    icon: Send,
    type: "info",
    content: {
      intro: "We need your public link so we can connect it to your GoodTherapy listing.",
      sections: [
        {
          heading: "On desktop (Search):",
          steps: [
            "Go to Google.com",
            "Search your practice name",
            "Click your listing",
            "Click \"Share\"",
            "Copy the link",
            "Email it to Editor@GoodTherapy.org"
          ]
        },
        {
          heading: "On Google Maps (mobile app):",
          steps: [
            "Open Google Maps",
            "Search your practice name",
            "Tap your listing",
            "Tap \"Share\"",
            "Copy link",
            "Email it to Editor@GoodTherapy.org"
          ]
        }
      ],
      note: "Once we have it, we can add a \"View on Google\" style link on your GoodTherapy profile so visitors can quickly confirm your verified presence."
    }
  },
  {
    id: 15,
    title: "From discovery to contact",
    description: "What this setup is really doing",
    icon: ArrowRight,
    type: "info",
    content: {
      flowSteps: [
        "A potential client searches your name, specialty, or \"therapist near me\"",
        "Your Google listing appears",
        "They click your GoodTherapy link",
        "They review your GoodTherapy profile for fit, credentials, and details",
        "They contact you through the path you prefer (often your GoodTherapy contact options)"
      ],
      note: "This keeps your Google listing simple, while your GoodTherapy profile does the heavy lifting."
    }
  },
  {
    id: 16,
    title: "Privacy and ethics reminders",
    description: "For reviews and messages",
    icon: Lock,
    type: "info",
    content: {
      intro: "Google is public. Treat it like a reminder sign, not a clinical space.",
      guidelines: [
        "Do not share client details",
        "If someone leaves a review, do not confirm they are a client, even if they say they are",
        "Keep replies general, thank them for feedback, and invite them to contact you privately",
        "Avoid discussing any care details in public replies"
      ],
      note: "Healthcare privacy guidance commonly recommends not confirming a patient relationship and not referencing any health details when responding to reviews."
    }
  },
  {
    id: 17,
    title: "Final checklist and what happens next",
    description: "Complete your setup and understand the next steps",
    icon: CheckSquare,
    type: "checklist",
    content: {
      intro: "Final checklist (make sure these are done):",
      items: [
        "Created or claimed your Google Business Profile",
        "Added your key info (name, address or service area, phone, hours)",
        "Added a short description that points people to your GoodTherapy profile",
        "Added your GoodTherapy profile link as your Website link",
        "If available, added your GoodTherapy profile link as a Booking/Appointment link (Google supports adding links in the Bookings area)",
        "Added at least one professional photo or logo",
        "Copied your public Google Business Profile link and sent it to Editor@GoodTherapy.org (many people copy it using the Share option in Search or Maps)"
      ],
      whatHappensNext: {
        heading: "What happens next (so you know exactly what to do):",
        sections: [
          {
            title: "What you do (member):",
            steps: [
              "Create or claim your Google Business Profile.",
              "Add your GoodTherapy profile as your Website link and, if Google shows it, as your Booking/Appointment link.",
              "Copy the public share link to your Google listing (from Google Search or Google Maps) and email it to Editor@GoodTherapy.org."
            ]
          },
          {
            title: "What we do (GoodTherapy):",
            steps: [
              "We open your link and confirm it is the right listing (right name, right city, not a duplicate).",
              "We add that link to your GoodTherapy profile as a \"View on Google\" style button/link.",
              "We save the update. Done."
            ]
          }
        ]
      },
      conclusion: "Once every item is checked, your Google listing and GoodTherapy profile are aligned. That helps people find you on Google, then learn more and reach out through your GoodTherapy profile."
    }
  }
];
