import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Skeleton } from '@/components/ui/skeleton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { ChevronLeft, ChevronRight, Upload, User, GraduationCap, BookOpen, Award, Shield, CheckCircle, X, FileText, Eye, EyeOff, AlertCircle } from 'lucide-react';
import { PhoneInput } from '@/components/ui/PhoneInput';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { OtpVerification } from '@/components/ui/OtpVerification';
import { ThemeToggle } from '@/components/ui/ThemeToggle';

// Algeria-specific validation patterns
const ALGERIA_PHONE_REGEX = /^\+213[0-9]{9}$/;
const ALGERIA_NIN_REGEX = /^[0-9]{18}$/; // Algeria NIN is 18 digits

// Validation schemas for each step
const step1Schema = z.object({
  email: z.string().email('Email invalide'),
  password: z.string().min(8, 'Le mot de passe doit contenir au moins 8 caractères'),
  confirmPassword: z.string(),
  phone: z.string().regex(ALGERIA_PHONE_REGEX, 'Numéro de téléphone invalide (+213xxxxxxxxx)')
}).refine(data => data.password === data.confirmPassword, {
  message: "Les mots de passe ne correspondent pas",
  path: ["confirmPassword"]
});
const step2Schema = z.object({
  fullName: z.string().min(2, 'Nom complet requis'),
  dateOfBirth: z.string().min(1, 'Date de naissance requise'),
  gender: z.enum(['male', 'female'], {
    required_error: 'Sexe requis'
  }),
  wilaya: z.string().min(1, 'Wilaya requise'),
  address: z.string().optional()
});
const step3Schema = z.object({
  nin: z.string().regex(ALGERIA_NIN_REGEX, 'NIN doit contenir exactement 18 chiffres'),
  nationalIdFront: z.any().refine(file => file && file.length > 0, "Carte d'identité (recto) requise"),
  nationalIdBack: z.any().refine(file => file && file.length > 0, "Carte d'identité (verso) requise")
});
const studentStep4Schema = z.object({
  educationLevel: z.string().min(1, 'Niveau d\'éducation requis'),
  institutionName: z.string().min(1, 'Nom de l\'établissement requis'),
  studentCard: z.any().refine(file => file && file.length > 0, "Carte d'étudiant ou certificat de scolarité requis")
});
const teacherStep4Schema = z.object({
  highestDegree: z.string().min(1, 'Diplôme le plus élevé requis'),
  institutionAffiliation: z.string().min(1, 'Affiliation institutionnelle requise'),
  teachingQualification: z.any().refine(file => file && file.length > 0, "Preuve de qualification d'enseignement requise")
});
const teacherStep5Schema = z.object({
  bio: z.string().min(10, 'Biographie requise (minimum 10 caractères)'),
  linkedIn: z.string().optional(),
  website: z.string().optional()
});
const finalSchema = z.object({
  agreeTerms: z.boolean().refine(val => val === true, 'Vous devez accepter les conditions'),
  consentData: z.boolean().refine(val => val === true, 'Vous devez accepter le traitement des données')
});
const wilayas = ['Adrar', 'Chlef', 'Laghouat', 'Oum El Bouaghi', 'Batna', 'Béjaïa', 'Biskra', 'Béchar', 'Blida', 'Bouira', 'Tamanrasset', 'Tébessa', 'Tlemcen', 'Tiaret', 'Tizi Ouzou', 'Alger', 'Djelfa', 'Jijel', 'Sétif', 'Saïda', 'Skikda', 'Sidi Bel Abbès', 'Annaba', 'Guelma', 'Constantine', 'Médéa', 'Mostaganem', 'M\'Sila', 'Mascara', 'Ouargla', 'Oran', 'El Bayadh', 'Illizi', 'Bordj Bou Arréridj', 'Boumerdès', 'El Tarf', 'Tindouf', 'Tissemsilt', 'El Oued', 'Khenchela', 'Souk Ahras', 'Tipaza', 'Mila', 'Aïn Defla', 'Naâma', 'Aïn Témouchent', 'Ghardaïa', 'Relizane'];
const educationLevels = ['Lycée (Secondaire)', 'Licence (Bachelor)', 'Master', 'Doctorat', 'Formation professionnelle', 'Autre'];
const degrees = ['Licence', 'Master', 'Doctorat', 'Ingénieur d\'État', 'Diplôme d\'études supérieures', 'Autre'];
const Register = () => {
  const navigate = useNavigate();
  const {
    toast
  } = useToast();
  const [userType, setUserType] = useState<'student' | 'teacher'>('student');
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<Record<string, File>>({});
  const [showOtpVerification, setShowOtpVerification] = useState(false);
  const [pendingRegistrationData, setPendingRegistrationData] = useState<any>(null);
  const [isDark, setIsDark] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [emailExists, setEmailExists] = useState<boolean | null>(null);
  const [emailCheckLoading, setEmailCheckLoading] = useState(false);
  const [ninExists, setNinExists] = useState<boolean | null>(null);
  const [ninCheckLoading, setNinCheckLoading] = useState(false);
  const [phoneExists, setPhoneExists] = useState<boolean | null>(null);
  const [phoneCheckLoading, setPhoneCheckLoading] = useState(false);
  const maxSteps = userType === 'student' ? 5 : 6;

  // Load theme and uploaded files on component mount
  useEffect(() => {
    const saved = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const shouldBeDark = saved === "dark" || (!saved && prefersDark);
    
    setIsDark(shouldBeDark);
    document.documentElement.classList.toggle("dark", shouldBeDark);

    const savedFiles = localStorage.getItem('registration-uploaded-files');
    if (savedFiles) {
      try {
        const parsed = JSON.parse(savedFiles);
        setUploadedFiles(parsed);
      } catch (error) {
        console.error('Failed to parse saved files:', error);
      }
    }
  }, []);

  const toggleTheme = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);
    document.documentElement.classList.toggle("dark", newIsDark);
    localStorage.setItem("theme", newIsDark ? "dark" : "light");
  };

  // Save uploaded files to localStorage whenever uploadedFiles changes
  useEffect(() => {
    if (Object.keys(uploadedFiles).length > 0) {
      localStorage.setItem('registration-uploaded-files', JSON.stringify(uploadedFiles));
    }
  }, [uploadedFiles]);

// Validation utilities - Email checking removed since it's handled by Supabase auth
  const checkEmailExists = async (email: string) => {
    // Email existence will be checked by Supabase auth during signup
    // No need to check separately since auth.users is not accessible via API
    setEmailExists(null);
  };

  const checkNinExists = async (nin: string) => {
    if (!nin || nin.length !== 18) return;
    setNinCheckLoading(true);
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('nin')
        .eq('nin', nin)
        .maybeSingle();
      
      if (error && error.code !== 'PGRST116') {
        console.error('Error checking NIN:', error);
        return;
      }
      
      setNinExists(!!data);
    } catch (error) {
      console.error('NIN check failed:', error);
    } finally {
      setNinCheckLoading(false);
    }
  };

  const checkPhoneExists = async (phone: string) => {
    // Phone is no longer stored in profiles table, handled by auth metadata
    setPhoneExists(null);
  };

  // Password strength calculation
  const calculatePasswordStrength = (password: string) => {
    let score = 0;
    if (password.length >= 8) score += 25;
    if (password.length >= 12) score += 25;
    if (/[a-z]/.test(password)) score += 12.5;
    if (/[A-Z]/.test(password)) score += 12.5;
    if (/\d/.test(password)) score += 12.5;
    if (/[^a-zA-Z\d]/.test(password)) score += 12.5;
    return Math.min(score, 100);
  };

  const getPasswordStrengthLabel = (score: number) => {
    if (score < 25) return { label: 'Très faible', color: 'bg-red-500' };
    if (score < 50) return { label: 'Faible', color: 'bg-orange-500' };
    if (score < 75) return { label: 'Moyen', color: 'bg-yellow-500' };
    if (score < 90) return { label: 'Fort', color: 'bg-blue-500' };
    return { label: 'Très fort', color: 'bg-green-500' };
  };
  const form = useForm({
    resolver: zodResolver(currentStep === 1 ? step1Schema : currentStep === 2 ? step2Schema : currentStep === 3 ? step3Schema : currentStep === 4 ? userType === 'student' ? studentStep4Schema : teacherStep4Schema : currentStep === 5 ? userType === 'teacher' ? teacherStep5Schema : finalSchema : finalSchema),
    mode: 'onChange'
  });
  const onNext = (data: any) => {
    setFormData({
      ...formData,
      ...data
    });
    setCurrentStep(currentStep + 1);
    form.reset();
    // Reset validation states
    setEmailExists(null);
    setNinExists(null);
    setPhoneExists(null);
  };
  const onBack = () => {
    setCurrentStep(currentStep - 1);
    // Reset validation states when going back
    setEmailExists(null);
    setNinExists(null);
    setPhoneExists(null);
  };

  // Reset validation states when user type changes
  useEffect(() => {
    setEmailExists(null);
    setNinExists(null);
    setPhoneExists(null);
    form.reset();
  }, [userType]);

  // File upload utility function
  const uploadFile = async (file: File, fileName: string): Promise<string | null> => {
    try {
      const fileExt = file.name.split('.').pop();
      const filePath = `${Date.now()}-${fileName}.${fileExt}`;
      const {
        error
      } = await supabase.storage.from('registration-documents').upload(filePath, file);
      if (error) {
        console.error('Upload error:', error);
        return null;
      }
      return filePath;
    } catch (error) {
      console.error('File upload failed:', error);
      return null;
    }
  };
  const onSubmit = async (data: any) => {
    setIsSubmitting(true);
    try {
      const finalData = {
        ...formData,
        ...data,
        userType
      };

      // Create auth user with email, password, and metadata
      const { data: signUpData, error: otpError } = await supabase.auth.signUp({
        email: finalData.email,
        password: finalData.password,
        options: {
          emailRedirectTo: `${window.location.origin}/`,
          data: {
            full_name: finalData.fullName,
            phone: finalData.phone
          }
        }
      });

      if (otpError) {
        throw otpError;
      }

      // Check if this is a repeated signup (user already exists)
      // Supabase returns success but with identities = [] for existing users
      if (signUpData?.user && (!signUpData.user.identities || signUpData.user.identities.length === 0)) {
        toast({
          variant: "destructive",
          title: "Email déjà enregistré",
          description: "Cet email a déjà un compte. Veuillez vous connecter au lieu de créer un nouveau compte."
        });
        setIsSubmitting(false);
        return;
      }

      // Upload files from uploadedFiles state
      const uploadPromises: Promise<{
        key: string;
        path: string | null;
      }>[] = [];
      if (uploadedFiles.nationalIdFront) {
        uploadPromises.push(uploadFile(uploadedFiles.nationalIdFront, 'national-id-front').then(path => ({
          key: 'national_id_front_path',
          path
        })));
      }
      if (uploadedFiles.nationalIdBack) {
        uploadPromises.push(uploadFile(uploadedFiles.nationalIdBack, 'national-id-back').then(path => ({
          key: 'national_id_back_path',
          path
        })));
      }
      if (uploadedFiles.studentCard) {
        uploadPromises.push(uploadFile(uploadedFiles.studentCard, 'student-card').then(path => ({
          key: 'student_card_path',
          path
        })));
      }
      if (uploadedFiles.teachingQualification) {
        uploadPromises.push(uploadFile(uploadedFiles.teachingQualification, 'teaching-qualification').then(path => ({
          key: 'teaching_qualification_path',
          path
        })));
      }
      const uploadResults = await Promise.all(uploadPromises);

      // Prepare registration data (only profile/onboarding fields)
      const registrationData: any = {
        date_of_birth: finalData.dateOfBirth,
        gender: finalData.gender,
        wilaya: finalData.wilaya,
        address: finalData.address || null,
        nin: finalData.nin,
        user_type: finalData.userType
      };

      // Add user-type specific fields
      if (userType === 'student') {
        registrationData.education_level = finalData.educationLevel;
        registrationData.institution_name = finalData.institutionName;
      } else {
        registrationData.highest_degree = finalData.highestDegree;
        registrationData.institution_affiliation = finalData.institutionAffiliation;
        registrationData.bio = finalData.bio;
        registrationData.linkedin = finalData.linkedIn || null;
        registrationData.website = finalData.website || null;
      }

      // Add file paths
      uploadResults.forEach(result => {
        if (result.path) {
          registrationData[result.key] = result.path;
        }
      });

      // Store registration data for after OTP verification
      setPendingRegistrationData(registrationData);
      toast({
        title: "Code de vérification envoyé!",
        description: "Vérifiez votre email pour le code de vérification."
      });

      // Show OTP verification
      setShowOtpVerification(true);
    } catch (error: any) {
      console.error('Registration error:', error);
      toast({
        variant: "destructive",
        title: "Erreur d'inscription",
        description: error.message || "Une erreur est survenue lors de l'inscription."
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  const handleOtpVerified = async () => {
    if (!pendingRegistrationData) return;
    setIsSubmitting(true);
    try {
      // Update the authenticated user's profile with registration data
      const { data: userData } = await supabase.auth.getUser();
      const userId = userData?.user?.id;
      if (!userId) {
        throw new Error('Utilisateur non authentifié après vérification.');
      }

      // Upsert profile data to ensure the row exists
      const { error } = await supabase
        .from('profiles')
        .upsert({ id: userId, ...pendingRegistrationData, status: 'pending' }, { onConflict: 'id' });

      if (error) {
        throw error;
      }

      toast({
        title: "Inscription réussie!",
        description: "Votre demande d'inscription a été soumise avec succès."
      });

      // Clear localStorage after successful submission
      localStorage.removeItem('registration-uploaded-files');
      
      // Redirect based on user type
      if (pendingRegistrationData.user_type === 'student') {
        navigate('/student');
      } else if (pendingRegistrationData.user_type === 'teacher') {
        navigate('/teacher');
      } else {
        navigate('/');
      }
    } catch (error: any) {
      console.error('Final registration error:', error);
      toast({
        variant: "destructive",
        title: "Erreur d'inscription",
        description: error.message || "Une erreur est survenue lors de l'inscription finale."
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  const FileUpload = ({
    label,
    accept = "image/*,.pdf",
    field,
    fieldName
  }: any) => {
    const [uploadProgress, setUploadProgress] = useState<number | null>(null);
    const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle');
    const existingFile = uploadedFiles[fieldName];
    const isUploaded = !!existingFile;
    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;
      setUploadStatus('uploading');
      setUploadProgress(0);

      // Simulate progress
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev === null || prev >= 90) return prev;
          return prev + Math.random() * 20;
        });
      }, 100);
      try {
        // Complete progress and save file
        setTimeout(() => {
          setUploadProgress(100);
          setUploadStatus('success');
          clearInterval(progressInterval);

          // Save file to uploadedFiles state
          setUploadedFiles(prev => ({
            ...prev,
            [fieldName]: file
          }));

          // Create FileList for form validation
          const dt = new DataTransfer();
          dt.items.add(file);
          field.onChange(dt.files);

          // Keep success state
          setTimeout(() => {
            setUploadProgress(null);
          }, 1000);
        }, 500);
      } catch (error) {
        setUploadStatus('error');
        clearInterval(progressInterval);
        setUploadProgress(null);
      }
    };
    const handleRemoveFile = () => {
      setUploadedFiles(prev => {
        const newFiles = {
          ...prev
        };
        delete newFiles[fieldName];
        return newFiles;
      });
      field.onChange(null);
      setUploadStatus('idle');
    };
    return <div className="space-y-2">
        <Label className="text-sm font-medium">{label}</Label>
        <div className={`border-2 border-dashed rounded-lg p-4 text-center transition-colors group relative ${isUploaded || uploadStatus === 'success' ? 'border-green-500 bg-green-50' : uploadStatus === 'error' ? 'border-red-500 bg-red-50' : 'border-muted-foreground/25 hover:border-muted-foreground/40 cursor-pointer'}`}>
          {uploadStatus === 'uploading' ? <>
              <div className="w-6 h-6 mx-auto mb-2 animate-spin rounded-full border-2 border-primary border-t-transparent"></div>
              <p className="text-sm text-primary">Téléchargement...</p>
              {uploadProgress !== null && <div className="w-full bg-muted rounded-full h-2 mt-2">
                  <div className="bg-green-600 h-2 rounded-full transition-all duration-300" style={{
              width: `${uploadProgress}%`
            }}></div>
                </div>}
            </> : isUploaded || uploadStatus === 'success' ? <>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <FileText className="h-5 w-5 text-green-600" />
                  <div className="text-left">
                    <p className="text-sm text-green-600 font-medium">Fichier téléchargé</p>
                    <p className="text-xs text-green-600/70">{existingFile?.name || 'Fichier sélectionné'}</p>
                  </div>
                </div>
                <Button type="button" variant="ghost" size="sm" onClick={handleRemoveFile} className="h-8 w-8 p-0 hover:bg-red-100">
                  <X className="h-4 w-4 text-red-500" />
                </Button>
              </div>
              <div className="text-center mt-2">
                <input type="file" accept={accept} onChange={handleFileChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                <p className="text-xs text-green-600/70">Cliquer pour changer le fichier</p>
              </div>
            </> : <>
              <Upload className="mx-auto h-6 w-6 text-muted-foreground mb-2 group-hover:text-primary transition-colors" />
              <input type="file" accept={accept} onChange={handleFileChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
              <p className="text-sm text-muted-foreground">Télécharger un fichier</p>
              <p className="text-xs text-muted-foreground/70 mt-1">PDF, JPG, PNG (max 5MB)</p>
            </>}
        </div>
      </div>;
  };
  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return <div className="space-y-4">
            <FormField control={form.control} name="email" render={({
            field
          }) => <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input 
                        type="email" 
                        placeholder="votre.email@exemple.com" 
                        autoComplete="new-email"
                        {...field} 
                        onBlur={(e) => {
                          field.onBlur();
                          checkEmailExists(e.target.value);
                        }}
                        className=""
                      />
                      {/* Email validation UI removed since it's handled by Supabase auth */}
                    </div>
                  </FormControl>
                  {/* Email error message removed since it's handled by Supabase auth */}
                  <FormMessage />
                </FormItem>} />
            
            <FormField control={form.control} name="password" render={({
            field
          }) => <FormItem>
                  <FormLabel>Mot de passe</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input 
                        type={showPassword ? "text" : "password"} 
                        placeholder="••••••••" 
                        autoComplete="new-password"
                        {...field}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </FormControl>
                  {field.value && (
                    <div className="mt-2">
                      {(() => {
                        const score = calculatePasswordStrength(field.value);
                        const { label, color } = getPasswordStrengthLabel(score);
                        return (
                          <div className="space-y-2">
                            <div className="flex justify-between items-center">
                              <span className="text-xs text-muted-foreground">Force du mot de passe</span>
                              <span className="text-xs font-medium">{label}</span>
                            </div>
                            <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                              <div 
                                className={`h-2 rounded-full transition-all duration-300 ${color}`}
                                style={{ width: `${score}%` }}
                              ></div>
                            </div>
                          </div>
                        );
                      })()}
                    </div>
                  )}
                  <FormMessage />
                </FormItem>} />
            
            <FormField control={form.control} name="confirmPassword" render={({
            field
          }) => <FormItem>
                  <FormLabel>Confirmer le mot de passe</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input 
                        type={showConfirmPassword ? "text" : "password"} 
                        placeholder="••••••••" 
                        autoComplete="new-password"
                        {...field}
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      >
                        {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>} />
            
            <FormField control={form.control} name="phone" render={({
            field
          }) => <FormItem>
                  <FormLabel>Numéro de téléphone</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <PhoneInput 
                        autoComplete="tel"
                        {...field} 
                        onBlur={(e) => {
                          field.onBlur();
                          checkPhoneExists(e.target.value);
                        }}
                        className=""
                      />
                      {/* Phone validation UI removed since it's handled by auth metadata */}
                    </div>
                  </FormControl>
                  {/* Phone error message removed since it's handled by auth metadata */}
                  <FormMessage />
                </FormItem>} />
          </div>;
      case 2:
        return <div className="space-y-4">
            <FormField control={form.control} name="fullName" render={({
            field
          }) => <FormItem>
                  <FormLabel>Nom complet</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Nom Prénom" 
                      autoComplete="name"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>} />
            <FormField control={form.control} name="dateOfBirth" render={({
            field
          }) => <FormItem>
                  <FormLabel>Date de naissance</FormLabel>
                  <FormControl>
                    <Input 
                      type="date" 
                      autoComplete="bday"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>} />
            <FormField control={form.control} name="gender" render={({
            field
          }) => <FormItem>
                  <FormLabel>Sexe</FormLabel>
                  <FormControl>
                    <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex flex-row space-x-6">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="male" id="male" />
                        <Label htmlFor="male">Homme</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="female" id="female" />
                        <Label htmlFor="female">Femme</Label>
                      </div>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>} />
            <FormField control={form.control} name="wilaya" render={({
            field
          }) => <FormItem>
                  <FormLabel>Wilaya de résidence</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner une wilaya" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {wilayas.map(wilaya => <SelectItem key={wilaya} value={wilaya}>{wilaya}</SelectItem>)}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>} />
            <FormField control={form.control} name="address" render={({
            field
          }) => <FormItem>
                  <FormLabel>Adresse (optionnel)</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Votre adresse complète" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>} />
          </div>;
      case 3:
        return <div className="space-y-4">
            <FormField control={form.control} name="nin" render={({
            field
          }) => <FormItem>
                  <FormLabel>Numéro d'identification nationale (NIN)</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input 
                        placeholder="18 chiffres (ex: 123456789012345678)" 
                        maxLength={18}
                        autoComplete="off"
                        {...field} 
                        onBlur={(e) => {
                          field.onBlur();
                          checkNinExists(e.target.value);
                        }}
                        className={ninExists === true ? 'border-red-500 focus:border-red-500' : ninExists === false ? 'border-green-500 focus:border-green-500' : ''}
                      />
                      {ninCheckLoading && (
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                          <div className="w-4 h-4 animate-spin rounded-full border-2 border-primary border-t-transparent"></div>
                        </div>
                      )}
                      {ninExists === true && (
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                          <AlertCircle className="w-4 h-4 text-red-500" />
                        </div>
                      )}
                      {ninExists === false && (
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                        </div>
                      )}
                    </div>
                  </FormControl>
                  {ninExists === true && (
                    <p className="text-sm text-red-500 mt-1">Ce numéro d'identification nationale est déjà utilisé.</p>
                  )}
                  <FormMessage />
                </FormItem>} />
            <FormField control={form.control} name="nationalIdFront" render={({
            field
          }) => <FormItem>
                   <FileUpload label="Carte d'identité nationale (recto)" field={field} fieldName="nationalIdFront" />
                  <FormMessage />
                </FormItem>} />
            <FormField control={form.control} name="nationalIdBack" render={({
            field
          }) => <FormItem>
                   <FileUpload label="Carte d'identité nationale (verso)" field={field} fieldName="nationalIdBack" />
                  <FormMessage />
                </FormItem>} />
          </div>;
      case 4:
        if (userType === 'student') {
          return <div className="space-y-4">
              <FormField control={form.control} name="educationLevel" render={({
              field
            }) => <FormItem>
                    <FormLabel>Niveau d'éducation actuel</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionner votre niveau" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {educationLevels.map(level => <SelectItem key={level} value={level}>{level}</SelectItem>)}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>} />
              <FormField control={form.control} name="institutionName" render={({
              field
            }) => <FormItem>
                    <FormLabel>Nom de l'établissement</FormLabel>
                    <FormControl>
                      <Input placeholder="Université / École / Centre privé" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>} />
            <FormField control={form.control} name="studentCard" render={({
              field
            }) => <FormItem>
                  <FileUpload label="Carte d'étudiant ou certificat de scolarité" field={field} fieldName="studentCard" />
                  <FormMessage />
                </FormItem>} />
            </div>;
        } else {
          return <div className="space-y-4">
              <FormField control={form.control} name="highestDegree" render={({
              field
            }) => <FormItem>
                    <FormLabel>Diplôme le plus élevé obtenu</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionner votre diplôme" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {degrees.map(degree => <SelectItem key={degree} value={degree}>{degree}</SelectItem>)}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>} />
              <FormField control={form.control} name="institutionAffiliation" render={({
              field
            }) => <FormItem>
                    <FormLabel>Affiliation institutionnelle</FormLabel>
                    <FormControl>
                      <Input placeholder="Université, École privée, Freelance" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>} />
              <FormField control={form.control} name="teachingQualification" render={({
              field
            }) => <FormItem>
                     <FileUpload label="Preuve de qualification d'enseignement (Diplôme/Attestation/CV)" accept="image/*,.pdf" field={field} fieldName="teachingQualification" />
                    <FormMessage />
                  </FormItem>} />
            </div>;
        }
      case 5:
        if (userType === 'teacher') {
          return <div className="space-y-4">
              <FormField control={form.control} name="bio" render={({
              field
            }) => <FormItem>
                    <FormLabel>Biographie courte</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Décrivez votre domaine d'expertise et votre expérience..." className="min-h-[100px]" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>} />
              <FormField control={form.control} name="linkedIn" render={({
              field
            }) => <FormItem>
                    <FormLabel>LinkedIn (optionnel)</FormLabel>
                    <FormControl>
                      <Input placeholder="https://linkedin.com/in/yourprofile" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>} />
              <FormField control={form.control} name="website" render={({
              field
            }) => <FormItem>
                    <FormLabel>Site Web personnel (optionnel)</FormLabel>
                    <FormControl>
                      <Input placeholder="https://votresite.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>} />
            </div>;
        }
      // Fall through to final step for students

      case 6:
      case 5:
        // Final step (5 for students, 6 for teachers)
        return <div className="space-y-4">
            <FormField control={form.control} name="agreeTerms" render={({
            field
          }) => <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>
                      J'accepte les conditions d'utilisation
                    </FormLabel>
                  </div>
                  <FormMessage />
                </FormItem>} />
            <FormField control={form.control} name="consentData" render={({
            field
          }) => <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>
                      Je consens au traitement de mes données personnelles
                    </FormLabel>
                  </div>
                  <FormMessage />
                </FormItem>} />
          </div>;
      default:
        return null;
    }
  };

  const RegisterSkeleton = () => (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/10 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl mx-auto">
        <div className="bg-card rounded-2xl shadow-2xl overflow-hidden border">
          <div className="flex h-[700px]">
            {/* Left Column Skeleton */}
            <div className="hidden lg:block lg:w-1/2 bg-gradient-to-br from-primary/20 to-primary/5 p-8">
              <div className="h-full flex flex-col justify-between">
                <div className="space-y-4">
                  <Skeleton className="h-8 w-48 bg-primary/30" />
                  <Skeleton className="h-4 w-64 bg-primary/20" />
                </div>
                <div className="space-y-4">
                  <Skeleton className="h-14 w-full bg-background/20" />
                  <Skeleton className="h-14 w-full bg-background/20" />
                </div>
              </div>
            </div>

            {/* Right Column Skeleton */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-12">
              <div className="w-full max-w-md space-y-6">
                {/* Header Skeleton */}
                <div className="text-center space-y-2">
                  <Skeleton className="h-8 w-48 mx-auto bg-muted/60" />
                  <Skeleton className="h-4 w-64 mx-auto bg-muted/40" />
                </div>

                {/* Tabs Skeleton */}
                <div className="grid grid-cols-2 gap-2 p-1 bg-muted rounded-md">
                  <Skeleton className="h-10 bg-primary/30" />
                  <Skeleton className="h-10 bg-muted/60" />
                </div>

                {/* Progress Skeleton */}
                <div className="flex items-center justify-between">
                  <Skeleton className="h-4 w-20 bg-muted/60" />
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Skeleton key={i} className="h-2 w-6 bg-primary/30" />
                    ))}
                  </div>
                </div>

                {/* Form Fields Skeleton */}
                <div className="space-y-5">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="space-y-2">
                      <Skeleton className="h-4 w-24 bg-muted/60" />
                      <Skeleton className="h-10 w-full bg-muted/40" />
                    </div>
                  ))}
                </div>

                {/* Buttons Skeleton */}
                <div className="flex justify-between pt-4">
                  <Skeleton className="h-10 w-24 bg-muted/40" />
                  <Skeleton className="h-10 w-32 bg-primary/30" />
                </div>

                {/* Footer Skeleton */}
                <div className="text-center">
                  <Skeleton className="h-4 w-40 mx-auto bg-muted/40" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Show OTP verification screen if needed
  if (showOtpVerification) {
    // Get email from form data instead of pendingRegistrationData
    const emailFromForm = (formData as any).email || '';
    return <OtpVerification email={emailFromForm} onVerified={handleOtpVerified} loading={isSubmitting} />;
  }
  return <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/10 flex items-center justify-center p-4">
      {/* Theme Toggle - Fixed Position */}
      <div className="fixed top-4 right-4 z-50">
        <div className="bg-card/80 backdrop-blur-sm border rounded-lg p-1">
          <ThemeToggle isDark={isDark} toggleTheme={toggleTheme} />
        </div>
      </div>

      <div className="w-full max-w-6xl mx-auto">
        <div className="bg-card rounded-2xl shadow-2xl overflow-hidden border">
          <div className="flex h-[700px]">
            {/* Left Column - E-learning Background with OAuth */}
            <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
              <img src="/lovable-uploads/33036365-2096-4b71-813a-f70b9459d29d.png" alt="E-learning Illustration" className="absolute inset-0 w-full h-full object-cover" style={{
              objectPosition: "20%",
              transform: "none !important",
              transition: "none !important"
            }} />
              {/* Overlay for better contrast */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/20"></div>
              
              <div className="absolute bottom-0 left-0 right-0 z-10 flex flex-col justify-end w-full p-8">
                {/* OAuth buttons at the bottom - full width */}
                <div className="flex flex-col space-y-4 w-full">
                  {/* Google OAuth Button */}
                  <Button type="button" variant="outline" className="w-full flex items-center justify-center gap-3 h-14 bg-background/95 hover:bg-background border-2 shadow-lg backdrop-blur-sm">
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                    </svg>
                    <span className="font-medium text-foreground">Continue with Google</span>
                  </Button>

                  {/* Microsoft OAuth Button */}
                  
                </div>
              </div>
            </div>

            {/* Right Column - Registration Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-12">
              <div className="w-full max-w-md space-y-6">
                {/* Header */}
                <div className="text-center">
                  <h2 className="text-2xl font-bold tracking-tight">Créer votre compte</h2>
                  <p className="text-muted-foreground mt-2">Commencez votre parcours d'apprentissage</p>
                </div>

                {/* User Type Tabs */}
                <Tabs value={userType} onValueChange={value => {
                setUserType(value as 'student' | 'teacher');
                setCurrentStep(1);
                form.reset();
              }} className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="student" className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      Étudiant(e)
                    </TabsTrigger>
                    <TabsTrigger value="teacher" className="flex items-center gap-2">
                      <GraduationCap className="h-4 w-4" />
                      Enseignant(e)
                    </TabsTrigger>
                  </TabsList>
                </Tabs>

                {/* Progress Indicator */}
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-muted-foreground">
                    Étape {currentStep} sur {maxSteps}
                  </span>
                  <div className="flex gap-1">
                    {Array.from({
                    length: maxSteps
                  }, (_, i) => <div key={i} className={`h-2 w-6 rounded-full transition-colors ${i + 1 <= currentStep ? 'bg-primary' : 'bg-muted'}`} />)}
                  </div>
                </div>

                {/* Form */}
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(currentStep === maxSteps ? onSubmit : onNext)} className="space-y-5">
                    {renderStepContent()}

                    <div className="flex justify-between pt-4">
                      <Button type="button" variant="outline" onClick={onBack} disabled={currentStep === 1} className="w-24">
                        <ChevronLeft className="w-4 h-4 mr-1" />
                        Retour
                      </Button>

                      <Button type="submit" className="w-32" disabled={isSubmitting}>
                        {isSubmitting ? <>
                            <div className="w-4 h-4 mr-2 animate-spin rounded-full border-2 border-background border-t-transparent" />
                            Envoi...
                          </> : currentStep === maxSteps ? <>
                            <CheckCircle className="w-4 h-4 mr-2" />
                            Créer
                          </> : <>
                            Suivant
                            <ChevronRight className="w-4 h-4 ml-1" />
                          </>}
                      </Button>
                    </div>
                  </form>
                </Form>

                {/* Footer */}
                <div className="text-center text-sm text-muted-foreground">
                  Déjà inscrit?{' '}
                  <button onClick={() => navigate('/?login=true')} className="text-primary hover:underline font-medium">
                    Se connecter
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>;
};
export default Register;