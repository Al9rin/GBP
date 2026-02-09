import {
    AnimatedCard,
    CardBody,
    CardDescription,
    CardTitle,
    CardVisual,
    Visual3
} from "@/components/ui/animated-card-chart";

export default function IntroductionVisual() {
    return (
        <div className="w-full flex items-center justify-center p-8">
            <AnimatedCard className="w-full max-w-4xl shadow-2xl shadow-emerald-900/10 border-slate-100">
                <CardVisual className="h-48 md:h-64">
                    {/* Main Color: #A2AD1A (Green), Secondary: #E06D00 (Orange) */}
                    <Visual3 mainColor="#A2AD1A" secondaryColor="#E06D00" />
                </CardVisual>
                <CardBody className="bg-white/50 backdrop-blur-sm">
                    <CardTitle className="text-slate-800">Maximize Your Practice Growth</CardTitle>
                    <CardDescription className="text-slate-500 font-medium">
                        Connect to GoodTherapy to boost referrals.
                    </CardDescription>
                </CardBody>
            </AnimatedCard>
        </div>
    );
} 
