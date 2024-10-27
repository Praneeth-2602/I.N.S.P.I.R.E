"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation"; // Import from next/navigation
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbPage } from "@/components/ui/breadcrumb";
import { MdOutlineEdit, MdOutlinePoll } from "react-icons/md";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { NavActions } from "@/components/nav-actions";
import Link from "next/link";

export default function EditProjectPage() {
    const [isMounted, setIsMounted] = useState(false); // Track client-side mounting
    const router = useRouter();
    const { projectid } = useParams(); // Get the project id from the URL

    // Check if we are on the client-side
    useEffect(() => {
        setIsMounted(true); // Mark as mounted when we are on the client
    }, []);

    const [project, setProject] = useState({
        title: "Project 1: Preview",
        description: "Small intro about the project goes here.",
        github: "https://github.com/user/project1",
        live: "https://project1.com",
        previewImage: null as string | null,
    });

    const [isSaving, setIsSaving] = useState(false);

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setProject((prev) => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e: any) => {
        const file = e.target.files[0];
        if (file) {
            setProject((prev) => ({ ...prev, previewImage: URL.createObjectURL(file) }));
        }
    };

    const handleSave = () => {
        setIsSaving(true);
        setTimeout(() => {
            setIsSaving(false);
            if (isMounted) {
                router.push(`/projects/${projectid}`);
            }
        }, 2000);
    };

    if (!isMounted) {
        return null; // Prevent rendering on the server-side
    }

    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <header className="flex h-14 shrink-0 items-center gap-2">
                    <div className="flex flex-1 items-center gap-2 px-3">
                        <SidebarTrigger />
                        <Separator orientation="vertical" className="mr-2 h-4" />
                        <Breadcrumb>
                            <BreadcrumbList>
                                <BreadcrumbItem>
                                    <BreadcrumbPage className="line-clamp-1 flex gap-2">
                                        <MdOutlineEdit className="h-[15px] w-[15px]" />
                                        Edit Project
                                    </BreadcrumbPage>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>
                    </div>
                    <div className="ml-auto px-3">
                        <NavActions />
                    </div>
                </header>

                {/* Centering the form using Flexbox */}
                <div className="flex justify-center items-center min-h-screen p-8"> 
                    <div className="w-full max-w-2xl bg-muted/50 p-8 rounded-md shadow-md">
                        {/* Project Title */}
                        <div className="mb-4">
                            <label className="block mb-2 text-sm font-medium">Project Title</label>
                            <Input
                                type="text"
                                name="title"
                                value={project.title}
                                onChange={handleChange}
                                placeholder="Enter project title"
                                className="w-full"
                            />
                        </div>

                        {/* Project Description */}
                        <div className="mb-4">
                            <label className="block mb-2 text-sm font-medium">Description</label>
                            <Textarea
                                name="description"
                                value={project.description}
                                onChange={handleChange}
                                placeholder="Enter project description"
                                className="w-full"
                            />
                        </div>

                        {/* GitHub Link */}
                        <div className="mb-4">
                            <label className="block mb-2 text-sm font-medium">GitHub Link</label>
                            <Input
                                type="url"
                                name="github"
                                value={project.github}
                                onChange={handleChange}
                                placeholder="https://github.com/..."
                                className="w-full"
                            />
                        </div>

                        {/* Live Link */}
                        <div className="mb-4">
                            <label className="block mb-2 text-sm font-medium">Live Link</label>
                            <Input
                                type="url"
                                name="live"
                                value={project.live}
                                onChange={handleChange}
                                placeholder="https://yourprojectlive.com"
                                className="w-full"
                            />
                        </div>

                        {/* Preview Image Upload */}
                        <div className="mb-6">
                            <label className="block mb-2 text-sm font-medium">Project Preview Image</label>
                            <input
                                type="file"
                                onChange={handleImageChange}
                                className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer"
                            />
                            {project.previewImage && (
                                <div className="mt-4">
                                    <img src={project.previewImage} alt="Project Preview" className="max-w-full h-auto rounded-md" />
                                </div>
                            )}
                        </div>

                        {/* Save and Cancel Buttons */}
                        <div className="flex justify-between">
                            <Button variant="secondary" onClick={() => router.push(`/projects/${projectid}`)}>
                                Cancel
                            </Button>
                            <Button onClick={handleSave} disabled={isSaving}>
                                {isSaving ? "Saving..." : "Save Changes"}
                            </Button>
                        </div>
                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}