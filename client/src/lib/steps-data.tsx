import { 
  UserPlus, 
  Search, 
  CheckCircle2, 
  MapPin, 
  Tag, 
  Phone, 
  Globe, 
  Clock, 
  MessageSquare, 
  Image as ImageIcon, 
  FileText, 
  ShieldCheck, 
  LayoutTemplate, 
  Camera, 
  UserCheck, 
  Star, 
  PartyPopper 
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
    title: "Account Creation",
    description: "Start your journey by creating a Google Business Profile account to manage your online presence.",
    icon: UserPlus,
    type: "info"
  },
  {
    id: 2,
    title: "Business Definition",
    description: "Define how your therapy practice appears on Google. This is your digital storefront.",
    icon: Search,
    type: "choice"
  },
  {
    id: 3,
    title: "Pre-requisites",
    description: "Ensure you have everything needed before we dive deep into the configuration.",
    icon: CheckCircle2,
    type: "checklist"
  },
  {
    id: 4,
    title: "Location Choice",
    description: "Do you have a physical office or do you serve clients remotely?",
    icon: MapPin,
    type: "choice"
  },
  {
    id: 5,
    title: "Service Area",
    description: "Define the geographic areas where you offer your therapy services.",
    icon: Globe,
    type: "info"
  },
  {
    id: 6,
    title: "Business Category",
    description: "Select primary and secondary categories (e.g., 'Psychotherapist', 'Counselor') to help clients find you.",
    icon: Tag,
    type: "info"
  },
  {
    id: 7,
    title: "Contact Information",
    description: "Add your professional phone number so potential clients can reach you directly.",
    icon: Phone,
    type: "form"
  },
  {
    id: 8,
    title: "Website Link",
    description: "Link to your GoodTherapy profile or personal practice website to drive traffic.",
    icon: LayoutTemplate,
    type: "form"
  },
  {
    id: 9,
    title: "Verification Method",
    description: "Choose how Google verifies your business location (Postcard, Phone, Email, or Video).",
    icon: ShieldCheck,
    type: "choice"
  },
  {
    id: 10,
    title: "Business Hours",
    description: "Set accurate hours when you are available for appointments or inquiries.",
    icon: Clock,
    type: "info"
  },
  {
    id: 11,
    title: "Messaging",
    description: "Enable messaging to let clients ask questions directly through your profile.",
    icon: MessageSquare,
    type: "choice"
  },
  {
    id: 12,
    title: "Business Description",
    description: "Write a compelling 750-character description of your practice, specialties, and approach.",
    icon: FileText,
    type: "form"
  },
  {
    id: 13,
    title: "Photos",
    description: "Upload high-quality photos of your office, logo, and yourself to build trust.",
    icon: ImageIcon,
    type: "info"
  },
  {
    id: 14,
    title: "Services List",
    description: "Detail specific services (e.g., CBT, Couples Therapy) directly on your profile.",
    icon: LayoutTemplate,
    type: "checklist"
  },
  {
    id: 15,
    title: "Verification Process",
    description: "Complete the verification step you selected earlier to go live.",
    icon: UserCheck,
    type: "info"
  },
  {
    id: 16,
    title: "Initial Reviews",
    description: "Learn strategies to ethically request initial reviews from colleagues or past clients.",
    icon: Star,
    type: "info"
  },
  {
    id: 17,
    title: "Final Review",
    description: "Double-check all your information and publish your optimized profile!",
    icon: PartyPopper,
    type: "final"
  }
];
