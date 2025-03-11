import { CheckCircle, FileText, Search, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NavLink } from "react-router";
import { analyzer, resume } from "@/data";

export default function ResumeLandingPage() {
  return (
    <div className="flex min-h-full flex-col">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-16 px-10 bg-gradient-to-b from-background to-muted h-full">
          <div className="container px-4 md:px-6">
            <div className="grid gap-8 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-5">
                  <h1 className="text-5xl font-semibold tracking-wide leading-snug font-Inter">
                    Build & Analyze Your Resume with AI
                  </h1>
                  <p className=" text-muted-foreground md:text-base">
                    Create professional resumes that stand out and get insights
                    on how to improve your chances of landing your dream job.
                  </p>
                </div>
                <div className="flex flex-col gap-5 min-[400px]:flex-row">
                  <NavLink to="/resume/resume-builder">
                    <Button size="lg" className="px-8">
                      Build Your Resume
                    </Button>
                  </NavLink>
                  <NavLink to="resume-analyzer">
                    <Button size="lg" variant="outline" className="px-8">
                      Analyze Your Resume
                    </Button>
                  </NavLink>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  <span>Free resume templates</span>
                  <CheckCircle className="h-4 w-4 text-primary" />
                  <span>AI-powered analysis</span>
                </div>
              </div>
              <div className="relative flex items-center justify-center">
                <div className="relative w-full h-[400px] overflow-hidden rounded-lg shadow-xl">
                  <img
                    src={resume}
                    alt="Resume Builder Preview"
                    className="object-cover"
                  />
                </div>
                <div className="absolute -bottom-6 -left-6 w-48 h-48 bg-primary/10 rounded-full blur-3xl" />
                <div className="absolute -top-6 -right-6 w-48 h-48 bg-primary/10 rounded-full blur-3xl" />
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">
                  Features
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                  Everything you need to land your dream job
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed">
                  Our platform combines powerful resume building tools with
                  AI-driven analysis to give you the edge in your job search.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
              <div className="grid gap-6">
                <div className="grid gap-4 items-start">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <FileText className="h-6 w-6 text-primary" />
                  </div>
                  <div className="grid gap-1">
                    <h3 className="text-xl font-bold">
                      Professional Resume Builder
                    </h3>
                    <p className="text-muted-foreground">
                      Create beautiful, ATS-friendly resumes with our
                      easy-to-use builder. Choose from dozens of professionally
                      designed templates.
                    </p>
                  </div>
                </div>
                <div className="grid gap-4 items-start">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <Search className="h-6 w-6 text-primary" />
                  </div>
                  <div className="grid gap-1">
                    <h3 className="text-xl font-bold">AI Resume Analysis</h3>
                    <p className="text-muted-foreground">
                      Get instant feedback on your resume with our AI analyzer.
                      Identify weaknesses and get suggestions for improvement.
                    </p>
                  </div>
                </div>
                <div className="grid gap-4 items-start">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <Award className="h-6 w-6 text-primary" />
                  </div>
                  <div className="grid gap-1">
                    <h3 className="text-xl font-bold">Job Match Scoring</h3>
                    <p className="text-muted-foreground">
                      See how well your resume matches specific job descriptions
                      and get tailored recommendations to increase your score.
                    </p>
                  </div>
                </div>
              </div>
              <div className="relative flex items-center justify-center">
                <div className="relative w-full h-[500px] overflow-hidden rounded-lg shadow-xl">
                  <img
                    src={analyzer}
                    alt="Resume Analysis Dashboard"
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section
          id="how-it-works"
          className="w-full py-12 md:py-24 lg:py-32 bg-muted"
        >
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">
                  How It Works
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                  Simple process, powerful results
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed">
                  Our platform makes it easy to create, analyze, and improve
                  your resume in just a few steps.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl gap-6 py-12 md:grid-cols-3">
              <div className="relative flex flex-col items-center space-y-4 rounded-lg border bg-background p-6 shadow-sm">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  1
                </div>
                <h3 className="text-xl font-bold">Create Your Resume</h3>
                <p className="text-center text-muted-foreground">
                  Choose a template and use our intuitive builder to create a
                  professional resume in minutes.
                </p>
              </div>
              <div className="relative flex flex-col items-center space-y-4 rounded-lg border bg-background p-6 shadow-sm">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  2
                </div>
                <h3 className="text-xl font-bold">Analyze Your Resume</h3>
                <p className="text-center text-muted-foreground">
                  Our AI analyzes your resume against industry standards and
                  provides detailed feedback.
                </p>
              </div>
              <div className="relative flex flex-col items-center space-y-4 rounded-lg border bg-background p-6 shadow-sm">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  3
                </div>
                <h3 className="text-xl font-bold">Improve & Apply</h3>
                <p className="text-center text-muted-foreground">
                  Make the suggested improvements and increase your chances of
                  landing interviews.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
