import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { TrendingUp, Users, Globe, DollarSign, Mail, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

export const Careers = () => {
  const { t, lang } = useLanguage();
  const basePath = lang === 'es' ? '/spanish' : '';

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 right-1/4 w-96 h-96 bg-gradient-to-b from-primary/10 to-transparent rounded-full blur-3xl" />
          <div className="absolute bottom-20 left-1/4 w-96 h-96 bg-gradient-to-t from-primary/10 to-transparent rounded-full blur-3xl" />
        </div>
        
        <div className="container mx-auto max-w-4xl relative">
          <Link 
            to={basePath || '/'} 
            className="inline-flex items-center text-primary hover:text-primary/80 transition-colors mb-8"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            {t('common.back_to_home')}
          </Link>
          
          <h1 className="text-5xl md:text-6xl font-bold gradient-text text-center mb-6">
            {t('careers.hero_title')}
          </h1>
          <p className="text-xl text-muted-foreground text-center leading-relaxed">
            {t('careers.hero_description')}
          </p>
        </div>
      </section>

      {/* Why Join Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-bold gradient-text text-center mb-16">
            {t('careers.why_join_title')}
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Professional Growth */}
            <div className="glass-card p-6 rounded-xl border border-border/20 hover:shadow-glow transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mb-4">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold gradient-text mb-3">
                {t('careers.benefit_growth')}
              </h3>
              <p className="text-muted-foreground text-sm">
                {t('careers.benefit_growth_desc')}
              </p>
            </div>

            {/* Collaborative Culture */}
            <div className="glass-card p-6 rounded-xl border border-border/20 hover:shadow-glow transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold gradient-text mb-3">
                {t('careers.benefit_culture')}
              </h3>
              <p className="text-muted-foreground text-sm">
                {t('careers.benefit_culture_desc')}
              </p>
            </div>

            {/* Global Impact */}
            <div className="glass-card p-6 rounded-xl border border-border/20 hover:shadow-glow transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mb-4">
                <Globe className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold gradient-text mb-3">
                {t('careers.benefit_impact')}
              </h3>
              <p className="text-muted-foreground text-sm">
                {t('careers.benefit_impact_desc')}
              </p>
            </div>

            {/* Competitive Package */}
            <div className="glass-card p-6 rounded-xl border border-border/20 hover:shadow-glow transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mb-4">
                <DollarSign className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold gradient-text mb-3">
                {t('careers.benefit_compensation')}
              </h3>
              <p className="text-muted-foreground text-sm">
                {t('careers.benefit_compensation_desc')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Open Positions Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-transparent via-primary/5 to-transparent">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-4xl font-bold gradient-text text-center mb-12">
            {t('careers.positions_title')}
          </h2>
          
          <div className="glass-card p-12 rounded-2xl border border-border/20 text-center">
            <p className="text-xl text-muted-foreground mb-8">
              {t('careers.no_positions')}
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="glass-card p-12 rounded-2xl border border-border/20 text-center">
            <h2 className="text-3xl font-bold gradient-text mb-6">
              {t('careers.interested_title')}
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              {t('careers.interested_text')}
            </p>
            <div className="flex items-center justify-center space-x-3">
              <Mail className="w-6 h-6 text-primary" />
              <p className="text-lg">
                {t('careers.send_resume')}{' '}
                <a 
                  href="mailto:contact@laformulacq.net" 
                  className="text-primary hover:underline font-semibold"
                >
                  contact@laformulacq.net
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};
