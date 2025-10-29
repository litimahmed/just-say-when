import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Building, FileText, Users, Check, ArrowRight, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Skeleton } from '@/components/ui/skeleton';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const steps = [
  {
    id: 1,
    title: 'Legal Entity Information',
    description: 'Company registration and legal details',
    icon: Building,
    fields: ['companyName', 'legalForm', 'rc', 'nif', 'nis', 'address', 'wilaya']
  },
  {
    id: 2,
    title: 'Business Details',
    description: 'Industry and operational information',
    icon: Users,
    fields: ['sector', 'employeeCount', 'establishedYear', 'website', 'description']
  },
  {
    id: 3,
    title: 'Partnership Proposal',
    description: 'Collaboration scope and objectives',
    icon: FileText,
    fields: ['partnershipType', 'targetMarket', 'expectedVolume', 'contactPerson', 'email', 'phone']
  }
];

const wilayas = [
  'Adrar', 'Chlef', 'Laghouat', 'Oum El Bouaghi', 'Batna', 'Béjaïa', 'Biskra', 'Béchar',
  'Blida', 'Bouira', 'Tamanrasset', 'Tébessa', 'Tlemcen', 'Tiaret', 'Tizi Ouzou', 'Alger',
  'Djelfa', 'Jijel', 'Sétif', 'Saïda', 'Skikda', 'Sidi Bel Abbès', 'Annaba', 'Guelma',
  'Constantine', 'Médéa', 'Mostaganem', 'MSila', 'Mascara', 'Ouargla', 'Oran', 'El Bayadh',
  'Illizi', 'Bordj Bou Arréridj', 'Boumerdès', 'El Tarf', 'Tindouf', 'Tissemsilt', 'El Oued',
  'Khenchela', 'Souk Ahras', 'Tipaza', 'Mila', 'Aïn Defla', 'Naâma', 'Aïn Témouchent',
  'Ghardaïa', 'Relizane'
];

const PartnerApplication = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    // Step 1: Legal Entity
    companyName: '',
    legalForm: '',
    rc: '', // Registre de Commerce
    nif: '', // Numéro d'Identification Fiscale
    nis: '', // Numéro d'Identification Statistique
    address: '',
    wilaya: '',
    
    // Step 2: Business Details
    sector: '',
    employeeCount: '',
    establishedYear: '',
    website: '',
    description: '',
    
    // Step 3: Partnership
    partnershipType: '',
    targetMarket: '',
    expectedVolume: '',
    contactPerson: '',
    email: '',
    phone: ''
  });

  const progress = (currentStep / steps.length) * 100;

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const validateStep = (step: number) => {
    const stepFields = steps.find(s => s.id === step)?.fields || [];
    return stepFields.every(field => formData[field as keyof typeof formData]);
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, steps.length));
    } else {
      toast({
        title: "Information requise",
        description: "Veuillez remplir tous les champs obligatoires.",
        variant: "destructive"
      });
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async () => {
    if (!validateStep(currentStep)) {
      toast({
        title: "Information requise",
        description: "Veuillez remplir tous les champs obligatoires.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    toast({
      title: "Demande soumise avec succès",
      description: "Nous examinerons votre demande et vous contacterons sous 2-3 jours ouvrables.",
    });
    
    setIsSubmitting(false);
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={() => navigate('/')}
            className="mb-6 text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour
          </Button>
          
          <div className="text-center">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Demande de Partenariat
            </h1>
            <p className="text-muted-foreground">
              Rejoignez notre réseau de partenaires éducatifs en Algérie
            </p>
          </div>
        </div>

        {/* Progress */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium">Étape {currentStep} sur {steps.length}</span>
              <Badge variant="secondary">{Math.round(progress)}%</Badge>
            </div>
            
            <Progress value={progress} className="mb-6" />
            
            <div className="flex justify-between">
              {steps.map((step, index) => (
                <div key={step.id} className="flex flex-col items-center">
                  <div className={`
                    w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium
                    ${currentStep >= step.id 
                      ? 'bg-primary text-primary-foreground' 
                      : 'bg-muted text-muted-foreground'
                    }
                  `}>
                    {currentStep > step.id ? <Check className="w-4 h-4" /> : step.id}
                  </div>
                  <span className="text-xs mt-2 text-center max-w-20">{step.title}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Form Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  {React.createElement(steps[currentStep - 1].icon, {
                    className: "w-5 h-5 text-primary"
                  })}
                  {steps[currentStep - 1].title}
                </CardTitle>
                <CardDescription>
                  {steps[currentStep - 1].description}
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Step 1: Legal Entity */}
                {currentStep === 1 && (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="companyName">Raison sociale *</Label>
                        <Input
                          id="companyName"
                          value={formData.companyName}
                          onChange={(e) => handleInputChange('companyName', e.target.value)}
                          placeholder="Nom complet de l'entreprise"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label>Forme juridique *</Label>
                        <Select 
                          value={formData.legalForm} 
                          onValueChange={(value) => handleInputChange('legalForm', value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionner" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="sarl">SARL</SelectItem>
                            <SelectItem value="spa">SPA</SelectItem>
                            <SelectItem value="eurl">EURL</SelectItem>
                            <SelectItem value="snc">SNC</SelectItem>
                            <SelectItem value="scs">SCS</SelectItem>
                            <SelectItem value="ei">Entreprise Individuelle</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="rc">Registre de Commerce *</Label>
                        <Input
                          id="rc"
                          value={formData.rc}
                          onChange={(e) => handleInputChange('rc', e.target.value)}
                          placeholder="ex: 16/00-123456B10"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="nif">NIF *</Label>
                        <Input
                          id="nif"
                          value={formData.nif}
                          onChange={(e) => handleInputChange('nif', e.target.value)}
                          placeholder="Numéro d'identification fiscale"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="nis">NIS *</Label>
                        <Input
                          id="nis"
                          value={formData.nis}
                          onChange={(e) => handleInputChange('nis', e.target.value)}
                          placeholder="Numéro d'identification statistique"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="address">Adresse du siège social *</Label>
                      <Input
                        id="address"
                        value={formData.address}
                        onChange={(e) => handleInputChange('address', e.target.value)}
                        placeholder="Adresse complète"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Wilaya *</Label>
                      <Select 
                        value={formData.wilaya} 
                        onValueChange={(value) => handleInputChange('wilaya', value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionner la wilaya" />
                        </SelectTrigger>
                        <SelectContent className="max-h-60">
                          {wilayas.map(wilaya => (
                            <SelectItem key={wilaya} value={wilaya}>{wilaya}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </>
                )}

                {/* Step 2: Business Details */}
                {currentStep === 2 && (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Secteur d'activité *</Label>
                        <Select 
                          value={formData.sector} 
                          onValueChange={(value) => handleInputChange('sector', value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionner" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="education">Éducation et Formation</SelectItem>
                            <SelectItem value="technology">Technologies de l'Information</SelectItem>
                            <SelectItem value="consulting">Conseil et Services</SelectItem>
                            <SelectItem value="healthcare">Santé</SelectItem>
                            <SelectItem value="finance">Finance et Banque</SelectItem>
                            <SelectItem value="manufacturing">Industrie</SelectItem>
                            <SelectItem value="energy">Énergie</SelectItem>
                            <SelectItem value="tourism">Tourisme</SelectItem>
                            <SelectItem value="agriculture">Agriculture</SelectItem>
                            <SelectItem value="other">Autre</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label>Nombre d'employés *</Label>
                        <Select 
                          value={formData.employeeCount} 
                          onValueChange={(value) => handleInputChange('employeeCount', value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionner" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1-9">1-9 employés (Micro)</SelectItem>
                            <SelectItem value="10-49">10-49 employés (Petite)</SelectItem>
                            <SelectItem value="50-249">50-249 employés (Moyenne)</SelectItem>
                            <SelectItem value="250+">250+ employés (Grande)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="establishedYear">Année de création *</Label>
                        <Input
                          id="establishedYear"
                          type="number"
                          min="1960"
                          max={new Date().getFullYear()}
                          value={formData.establishedYear}
                          onChange={(e) => handleInputChange('establishedYear', e.target.value)}
                          placeholder="YYYY"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="website">Site web</Label>
                        <Input
                          id="website"
                          value={formData.website}
                          onChange={(e) => handleInputChange('website', e.target.value)}
                          placeholder="https://www.exemple.com"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description">Description de l'activité *</Label>
                      <Textarea
                        id="description"
                        value={formData.description}
                        onChange={(e) => handleInputChange('description', e.target.value)}
                        placeholder="Décrivez brièvement vos activités principales et votre expertise"
                        rows={4}
                      />
                    </div>
                  </>
                )}

                {/* Step 3: Partnership */}
                {currentStep === 3 && (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Type de partenariat *</Label>
                        <Select 
                          value={formData.partnershipType} 
                          onValueChange={(value) => handleInputChange('partnershipType', value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionner" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="training-provider">Prestataire de formation</SelectItem>
                            <SelectItem value="content-creator">Création de contenu</SelectItem>
                            <SelectItem value="technology-integration">Intégration technologique</SelectItem>
                            <SelectItem value="local-distributor">Distribution locale</SelectItem>
                            <SelectItem value="corporate-training">Formation d'entreprise</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label>Marché cible *</Label>
                        <Select 
                          value={formData.targetMarket} 
                          onValueChange={(value) => handleInputChange('targetMarket', value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionner" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="individuals">Particuliers</SelectItem>
                            <SelectItem value="sme">PME/PMI</SelectItem>
                            <SelectItem value="large-enterprises">Grandes entreprises</SelectItem>
                            <SelectItem value="government">Secteur public</SelectItem>
                            <SelectItem value="universities">Universités</SelectItem>
                            <SelectItem value="mixed">Mixte</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Volume d'activité estimé *</Label>
                      <Select 
                        value={formData.expectedVolume} 
                        onValueChange={(value) => handleInputChange('expectedVolume', value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionner" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="50-200">50-200 apprenants/an</SelectItem>
                          <SelectItem value="200-500">200-500 apprenants/an</SelectItem>
                          <SelectItem value="500-1000">500-1000 apprenants/an</SelectItem>
                          <SelectItem value="1000+">1000+ apprenants/an</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <Separator className="my-6" />

                    <h4 className="font-semibold text-foreground mb-4">Contact commercial</h4>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="contactPerson">Nom et prénom *</Label>
                        <Input
                          id="contactPerson"
                          value={formData.contactPerson}
                          onChange={(e) => handleInputChange('contactPerson', e.target.value)}
                          placeholder="Responsable commercial"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email">Email professionnel *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          placeholder="contact@entreprise.com"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Téléphone *</Label>
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        placeholder="+213 XX XX XX XX XX"
                      />
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex justify-between items-center mt-8">
          <Button
            variant="outline"
            onClick={prevStep}
            disabled={currentStep === 1}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Précédent
          </Button>

          {currentStep < steps.length ? (
            <Button onClick={nextStep}>
              Suivant
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  Envoi en cours...
                </>
              ) : (
                <>
                  Soumettre la demande
                  <Send className="w-4 h-4 ml-2" />
                </>
              )}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PartnerApplication;