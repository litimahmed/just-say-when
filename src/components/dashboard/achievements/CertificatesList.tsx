import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  GraduationCap, Download, Eye, Calendar, 
  Award, CheckCircle, ExternalLink 
} from "lucide-react";

export function CertificatesList() {
  const certificates = [
    {
      id: 1,
      title: "React.js Fundamentals",
      issuer: "FormAcad",
      issueDate: "2024-03-15",
      credentialId: "REACT-2024-001",
      status: "verified",
      skills: ["React", "JavaScript", "JSX", "Components"],
      image: "/course-react.jpg"
    },
    {
      id: 2,
      title: "JavaScript Advanced Concepts",
      issuer: "FormAcad",
      issueDate: "2024-02-28",
      credentialId: "JS-ADV-2024-002",
      status: "verified",
      skills: ["ES6+", "Async/Await", "Closures", "Prototypes"],
      image: "/course-javascript.jpg"
    },
    {
      id: 3,
      title: "UX Design Principles",
      issuer: "FormAcad",
      issueDate: "2024-01-20",
      credentialId: "UX-2024-003",
      status: "verified",
      skills: ["User Research", "Wireframing", "Prototyping", "Usability"],
      image: "/course-ux.jpg"
    }
  ];

  const upcomingCertificates = [
    {
      course: "Node.js Backend Development",
      progress: 85,
      estimatedCompletion: "2024-04-15"
    },
    {
      course: "TypeScript Mastery",
      progress: 62,
      estimatedCompletion: "2024-05-01"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Earned Certificates */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <GraduationCap className="w-5 h-5 text-primary" />
            <span>Earned Certificates</span>
            <Badge variant="secondary">{certificates.length}</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6">
            {certificates.map((certificate) => (
              <div
                key={certificate.id}
                className="group relative p-6 rounded-xl border bg-gradient-to-r from-card to-card/50 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-start space-x-4">
                  {/* Certificate Image */}
                  <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                    <img 
                      src={certificate.image} 
                      alt={certificate.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <div className="absolute bottom-1 right-1">
                      <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                        <CheckCircle className="w-3 h-3 text-white" />
                      </div>
                    </div>
                  </div>

                  {/* Certificate Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div className="space-y-2">
                        <h3 className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors">
                          {certificate.title}
                        </h3>
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <span>Issued by {certificate.issuer}</span>
                          <div className="flex items-center space-x-1">
                            <Calendar className="w-4 h-4" />
                            <span>{new Date(certificate.issueDate).toLocaleDateString()}</span>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Credential ID: {certificate.credentialId}
                        </p>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Badge variant="outline" className="text-green-600 border-green-600">
                          <Award className="w-3 h-3 mr-1" />
                          Verified
                        </Badge>
                      </div>
                    </div>

                    {/* Skills */}
                    <div className="mt-3 flex flex-wrap gap-2">
                      {certificate.skills.map((skill, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>

                    {/* Actions */}
                    <div className="mt-4 flex items-center space-x-3">
                      <Button size="sm" variant="outline" className="flex items-center space-x-2">
                        <Eye className="w-4 h-4" />
                        <span>View</span>
                      </Button>
                      <Button size="sm" variant="outline" className="flex items-center space-x-2">
                        <Download className="w-4 h-4" />
                        <span>Download</span>
                      </Button>
                      <Button size="sm" variant="outline" className="flex items-center space-x-2">
                        <ExternalLink className="w-4 h-4" />
                        <span>Share</span>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Upcoming Certificates */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Award className="w-5 h-5 text-primary" />
            <span>Certificates in Progress</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {upcomingCertificates.map((cert, index) => (
              <div key={index} className="p-4 rounded-lg border bg-card/50">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium text-foreground">{cert.course}</h4>
                  <Badge variant="outline">{cert.progress}% Complete</Badge>
                </div>
                
                <div className="space-y-2">
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className="bg-primary h-2 rounded-full transition-all duration-300"
                      style={{ width: `${cert.progress}%` }}
                    />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Estimated completion: {new Date(cert.estimatedCompletion).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}