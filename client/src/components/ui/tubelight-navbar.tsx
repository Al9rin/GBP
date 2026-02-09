"use client"

import React, { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

import { LucideIcon, Home, Mail, ChevronDown, CheckCircle2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { STEPS } from "@/lib/steps-data";
import { EmailPopup } from "@/components/ui/EmailPopup";

interface NavItem {
    name: string
    url?: string
    icon: LucideIcon
    iconRight?: LucideIcon
    action?: () => void
    showEmailPopup?: boolean
    children?: { name: string; url: string; action?: () => void }[]
    className?: string
}

interface NavBarProps {
    items: NavItem[]
    className?: string
}

export function NavBar({ items, className }: NavBarProps) {
    const [activeTab, setActiveTab] = useState(items[0].name)
    const [isMobile, setIsMobile] = useState(false)
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);
    const [emailPopupOpen, setEmailPopupOpen] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768)
        }

        handleResize()
        window.addEventListener("resize", handleResize)
        return () => window.removeEventListener("resize", handleResize)
    }, [])

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = () => setOpenDropdown(null);
        document.addEventListener("click", handleClickOutside);
        return () => document.removeEventListener("click", handleClickOutside);
    }, []);

    return (
        <div
            className={cn(
                "fixed top-0 left-1/2 -translate-x-1/2 z-50 pt-6", // Fixed to top
                className,
            )}
        >
            <div className="flex items-center gap-3 bg-background/5 border border-white/10 backdrop-blur-lg py-1 px-1 rounded-full shadow-lg">
                {items.map((item) => {
                    const Icon = item.icon
                    const IconRight = item.iconRight
                    const isActive = activeTab === item.name
                    const hasChildren = !!item.children;

                    return (
                        <div key={item.name} className="relative group">
                            <div
                                onClick={(e) => {
                                    e.stopPropagation(); // Prevent closing immediately
                                    setActiveTab(item.name);
                                    if (item.showEmailPopup) {
                                        setEmailPopupOpen(true);
                                    } else if (item.action) {
                                        item.action();
                                    }
                                    if (hasChildren) {
                                        setOpenDropdown(openDropdown === item.name ? null : item.name);
                                    } else {
                                        setOpenDropdown(null);
                                    }
                                }}
                                className={cn(
                                    "relative cursor-pointer text-sm font-semibold px-6 py-2 rounded-full transition-colors flex items-center gap-2",
                                    "text-foreground/80 hover:text-primary",
                                    isActive && "bg-transparent border border-primary/20 text-primary",
                                    item.className
                                )}
                            >
                                <span className="hidden md:inline">{item.name}</span>
                                <span className="md:hidden">
                                    <Icon size={18} strokeWidth={2.5} />
                                </span>
                                {hasChildren && <ChevronDown size={14} className={cn("transition-transform", openDropdown === item.name ? "rotate-180" : "")} />}
                                {IconRight && <IconRight size={16} strokeWidth={2.5} className="ml-1" />}

                                {isActive && (
                                    <motion.div
                                        layoutId="lamp"
                                        className="absolute inset-0 w-full bg-primary/5 rounded-full -z-10"
                                        initial={false}
                                        transition={{
                                            type: "spring",
                                            stiffness: 300,
                                            damping: 30,
                                        }}
                                    >
                                        <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-1 bg-primary rounded-t-full">
                                            <div className="absolute w-12 h-6 bg-primary/20 rounded-full blur-md -top-2 -left-2" />
                                            <div className="absolute w-8 h-6 bg-primary/20 rounded-full blur-md -top-1" />
                                            <div className="absolute w-4 h-4 bg-primary/20 rounded-full blur-sm top-0 left-2" />
                                        </div>
                                    </motion.div>
                                )}
                            </div>

                            {/* Dropdown for Steps */}
                            <AnimatePresence>
                                {hasChildren && openDropdown === item.name && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                        transition={{ duration: 0.2 }}
                                        className="absolute top-full mt-2 left-1/2 -translate-x-1/2 w-64 md:w-80 bg-white border border-white/20 rounded-2xl shadow-2xl p-2 max-h-[60vh] overflow-y-auto custom-scrollbar"
                                    >
                                        <div className="flex flex-col gap-1">
                                            {item.children?.map((child, idx) => (
                                                <a
                                                    key={idx}
                                                    href={child.action ? undefined : child.url}
                                                    className="px-4 py-3 text-sm text-gray-700 hover:bg-black/5 rounded-xl transition-colors text-left flex items-start gap-2 cursor-pointer"
                                                    onClick={(e) => {
                                                        if (child.action) {
                                                            e.preventDefault();
                                                            child.action();
                                                        }
                                                        setOpenDropdown(null);
                                                    }}
                                                >
                                                    <div className="mt-0.5 min-w-[20px] h-5 flex items-center justify-center bg-orange-50 rounded-full text-[10px] font-bold text-orange-500">
                                                        {idx + 1}
                                                    </div>
                                                    <span className="leading-tight">{child.name}</span>
                                                </a>
                                            ))}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    )
                })}
            </div>

            {/* Email Popup */}
            <EmailPopup open={emailPopupOpen} onClose={() => setEmailPopupOpen(false)} />
        </div>
    )
}
