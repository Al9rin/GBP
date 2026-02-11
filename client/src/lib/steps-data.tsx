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
        "Your <a-gt>GoodTherapy profile</a-gt> already helps people understand who you are and how you work. A <a-gbp>Google Business Profile</a-gbp> (GBP) helps more people find you in Google Search and Google Maps, then click through to your <a-gt>GoodTherapy profile</a-gt>.",
        "When your GBP points to your <a-gt>GoodTherapy profile</a-gt>, you create a cleaner path for <kw>referrals</kw>: people find you on Google, then read your full, trusted profile on GoodTherapy before contacting you."
      ],
      heading: "This guide will help you:",
      list: [
        "Create or claim your <a-gbp>Google Business Profile</a-gbp>",
        "Add your <a-gt>GoodTherapy link</a-gt> in the right places",
        "Send your public GBP link to GoodTherapy so we can connect it to your listing"
      ]
    }
  },
  {
    id: 2,
    title: "What Is a Google Business Profile?",
    description: "Learn what a GBP is and where it appears",
    icon: Globe,
    type: "info",
    content: {
      intro: "A <a-gbp>Google Business Profile</a-gbp> is a <strong>free listing</strong> that puts your practice on the map.",
      heading: "It appears in two key places:",
      featureList: [
        {
          title: "Google Search",
          desc: "When patients search for 'therapist near me' or your name.",
          icon: "search"
        },
        {
          title: "Google Maps",
          desc: "Helping locals find your office or service area visually.",
          icon: "map"
        }
      ],
      paragraphs: [
        "It showcases your <strong>practice name</strong>, <strong>phone number</strong>, <strong>hours</strong>, and most importantly, your <strong>website link</strong>.",
        "By linking this to your <a-gt>GoodTherapy profile</a-gt>, new patients will land on your trusted, professional bio before reaching out."
      ]
    }
  },
  {
    id: 3,
    title: "How This Supports Your GoodTherapy Referrals",
    description: "Understand the referral path you're building",
    icon: TrendingUp,
    type: "info",
    content: {
      list: [
        "A complete Google listing helps Google match you to relevant searches and display accurate information.",
        "It also helps people trust what they see because your details look <kw>consistent across platforms</kw>.",
        "Google's own guidance puts a lot of weight on accurate info (name, category, address or service area)."
      ],
      heading: "The simple referral path you are building is:",
      flowSteps: [
        "Google Search or Maps",
        "Your Google listing",
        "Your GoodTherapy profile",
        "Contact/request"
      ]
    }
  },
  {
    id: 4,
    title: "Before You Start: Gather Your Details",
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
        "Your <a-gt>GoodTherapy profile link</a-gt>"
      ],
      note: "If you do not see clients at your address, you should set your profile up as a <kw>service-area business</kw> and not display a street address."
    }
  },
  {
    id: 5,
    title: "Start Your Practice",
    description: "Get started with Google Business Profile",
    icon: LogIn,
    type: "info",
    content: {
      steps: [
        "Go to <a-gbp>Google Business Profile</a-gbp> sign-in page",
        "Click <kw>\"Manage now\"</kw> or sign in",
        "Use the Google account you want to manage this long term"
      ],
      tip: "Use an account you will not lose access to. This account controls your listing."
    }
  },
  {
    id: 6,
    title: "Add Your Practice Name",
    description: "Claim or create your business listing",
    icon: Building,
    type: "info",
    content: {
      steps: [
        "Type your practice name",
        "If Google suggests an existing listing, select it. You may be <kw>claiming a profile</kw> that already exists.",
        "If nothing matches, choose \"Create a business with this name\"",
        "Continue"
      ],
      tip: "Keep the name consistent with how you present it elsewhere (GoodTherapy, your voicemail greeting, your email signature). Google recommends representing your business consistently in the real world."
    }
  },
  {
    id: 7,
    title: "Choose Your Business Category",
    description: "This matters a lot for search visibility",
    icon: Tags,
    type: "info",
    content: {
      steps: [
        "In <kw>\"Business category,\"</kw> start typing and pick the closest match from Google's list",
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
    title: "Set How Your Location Is Displayed",
    description: "Address vs. service area decision",
    icon: MapPin,
    type: "choice",
    content: {
      question: "Google will ask if customers can visit you at a location.",
      options: [
        {
          label: "Yes — clients can visit my office",
          description: "Choose \"Yes,\" enter your office address (match what you use on GoodTherapy), and check the map pin is correct"
        },
        {
          label: "No — service-area business",
          description: "Choose \"No,\" add your <kw>service area</kw> (city/region where you serve clients), and continue. You must hide your address."
        }
      ],
      note: "<strong>Important:</strong> If you work from home and do not serve clients at that address (e.g., telehealth only), you <strong>must</strong> select 'No' and hide your address. Displaying a residential address where you don't receive customers can lead to suspension.",
      privacyTip: "If you only work virtually, set a service area for the local region you serve and hide your address. Note: If you have no local service area and no in-person contact at all, you may not qualify for a Google Business Profile."
    }
  },
  {
    id: 9,
    title: "Add Contact Details\nand Your GoodTherapy Link",
    description: "Connect your profile to GoodTherapy",
    icon: Phone,
    type: "info",
    content: {
      steps: [
        "Add the phone number you want for new inquiries",
        "For \"Website,\" enter your practice website. If you do not have a website, use your <a-gt>GoodTherapy profile link</a-gt>",
        "Save and continue"
      ],
      tip: "<kw>Consistency</kw> helps. Use the same phone number and location/service area wherever possible so people do not get confused."
    }
  },
  {
    id: 10,
    title: "Verify Your Practice",
    description: "Do not skip this critical step",
    icon: ShieldCheck,
    type: "info",
    content: {
      intro: "<kw>Verification</kw> helps confirm your practice is legitimate and unlocks <kw>full editing control</kw>.",
      paragraphs: [
        "Google decides which verification methods you get. You cannot force a specific option, and sometimes you may need more than one method."
      ],
      heading: "Common methods you may see:",
      methods: [
        { name: "Video Recording", steps: "Record your location (street signs), equipment, and proof of management." },
        { name: "Phone or Text", steps: "Enter the code you receive" },
        { name: "Email", steps: "Enter the code you receive" },
        { name: "Postcard", steps: "Request it, then enter the code when it arrives (slower)" }
      ],
      tip: "<strong>Video Prep:</strong> Google prompts many service-area businesses to verify by video. Be ready to show street signs or landmarks near you, your work tools/setup, and proof you manage the business (like unlocking a car or showing branded documents). Do not film clients or private files."
    }
  },
  {
    id: 11,
    title: "Fill In Key Practice Details",
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
          heading: "2) Business Description",
          paragraphs: [
            "Write a short, clear description. Keep it readable. Include who you help and how you work, then point to GoodTherapy for full details. Many guides note the description is limited and works best when it is clear and <kw>client-focused</kw>."
          ],
          example: "\"I offer online and in-person therapy for adults. I support people with anxiety, stress, depression, and relationship concerns. For my approach, fees, and how to contact me, please visit my <a-gt>GoodTherapy profile</a-gt>.\""
        }
      ],
      tip: "Avoid listing sensitive details. Keep it general."
    }
  },
  {
    id: 12,
    title: "Add Your GoodTherapy Profile\nas Appointment Link",
    description: "Use the booking link feature if available",
    icon: Calendar,
    type: "info",
    content: {
      intro: "If Google shows \"Bookings\" or <kw>\"Appointment links,\"</kw> use it.",
      steps: [
        "Search your business name on Google while logged into the right account",
        "Click \"Edit profile\" or \"Bookings\"",
        "Add your <a-gt>GoodTherapy profile link</a-gt> as the booking or appointment link",
        "Save"
      ],
      paragraphs: [
        "Google supports adding booking links, including adding your own link."
      ],
      tip: "If you do not see \"Bookings,\" do not worry. Not every profile has the same options. If available, it can show as a <kw>Bookings/Appointment action</kw> on Search or Maps, which makes it easier for people to take the next step."
    }
  },
  {
    id: 13,
    title: "Add Photos or a Logo",
    description: "Keep it simple and professional",
    icon: Camera,
    type: "info",
    content: {
      intro: "Photos can increase <kw>comfort and trust</kw> because people can \"recognize\" you or your office before reaching out.",
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
    title: "Send Your Public GBP Link to GoodTherapy",
    description: "Connect your profiles together",
    icon: Send,
    type: "info",
    content: {
      intro: "We need your <kw>public link</kw> so we can connect it to your <a-gt>GoodTherapy listing</a-gt>.",
      sections: [
        {
          heading: "On Desktop (Search):",
          steps: [
            "Go to Google.com",
            "Search your practice name",
            "Click your listing",
            "Click \"Share\"",
            "Copy the link",
            "Email it to <a-email>editor@goodtherapy.org</a-email>"
          ]
        },
        {
          heading: "On Google Maps (Mobile App):",
          steps: [
            "Open Google Maps",
            "Search your practice name",
            "Tap your listing",
            "Tap \"Share\"",
            "Copy link",
            "Email it to <a-email>editor@goodtherapy.org</a-email>"
          ]
        }
      ],
      note: "Once we have it, we can add a \"View on Google\" style link on your <a-gt>GoodTherapy profile</a-gt> so visitors can quickly confirm your verified presence."
    }
  },
  {
    id: 15,
    title: "From Discovery to Contact",
    description: "What this setup is really doing",
    icon: ArrowRight,
    type: "info",
    content: {
      flowSteps: [
        "A potential client searches your name, specialty, or \"therapist near me\"",
        "Your Google listing appears",
        "They click your GoodTherapy link",
        "They review your <a-gt>GoodTherapy profile</a-gt> for fit, credentials, and details",
        "They contact you through the path you prefer (often your GoodTherapy contact options)"
      ],
      note: "This keeps your Google listing simple, while your <a-gt>GoodTherapy profile</a-gt> does the heavy lifting."
    }
  },
  {
    id: 16,
    title: "Privacy and Ethics Reminders",
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
      note: "Healthcare <kw>privacy</kw> guidance commonly recommends not confirming a patient relationship and not referencing any health details when responding to reviews."
    }
  },
  {
    id: 17,
    title: "Final Checklist and What Happens Next",
    description: "Complete your setup and understand the next steps",
    icon: CheckSquare,
    type: "checklist",
    content: {
      intro: "<kw>Final checklist</kw> (make sure these are done):",
      items: [
        "Created or claimed your <a-gbp>Google Business Profile</a-gbp>",
        "Added your key info (name, address or service area, phone, hours)",
        "Added a short description that points people to your <a-gt>GoodTherapy profile</a-gt>",
        "Added your <a-gt>GoodTherapy profile link</a-gt> as your Website link",
        "If available, added your <a-gt>GoodTherapy profile link</a-gt> as a Booking/Appointment link (Google supports adding links in the Bookings area)",
        "Added at least one professional photo or logo",
        "Copied your public <a-gbp>Google Business Profile</a-gbp> link and sent it to <a-email>editor@goodtherapy.org</a-email> (many people copy it using the Share option in Search or Maps)"
      ],
      whatHappensNext: {
        heading: "What happens next (so you know exactly what to do):",
        sections: [
          {
            title: "What You Do (Member):",
            steps: [
              "Create or claim your <a-gbp>Google Business Profile</a-gbp>.",
              "Add your <a-gt>GoodTherapy profile</a-gt> as your Website link and, if Google shows it, as your Booking/Appointment link.",
              "Copy the public share link to your Google listing (from Google Search or Google Maps) and email it to <a-email>editor@goodtherapy.org</a-email>."
            ]
          },
          {
            title: "What We Do (GoodTherapy):",
            steps: [
              "We open your link and confirm it is the right listing (right name, right city, not a duplicate).",
              "We add that link to your <a-gt>GoodTherapy profile</a-gt> as a \"View on Google\" style button/link.",
              "We save the update. Done."
            ]
          }
        ]
      },
      conclusion: "Once every item is checked, your Google listing and <a-gt>GoodTherapy profile</a-gt> are aligned. That helps people find you on Google, then learn more and reach out through your <a-gt>GoodTherapy profile</a-gt>."
    }
  }
];
