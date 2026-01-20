import { Home, User, Briefcase, FileText } from "lucide-react"
import { TubelightNavBar } from "@/components/ui/tubelight-navbar"

export function TubelightNavDemo() {
    const navItems = [
        { name: "Home", url: "/", icon: Home },
        { name: "About", url: "/about", icon: User },
        { name: "Projects", url: "/conditions", icon: Briefcase },
        { name: "Events", url: "/events", icon: FileText },
    ]

    return <TubelightNavBar items={navItems} />
}