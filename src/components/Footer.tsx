import { Mail } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Link } from 'react-router-dom';

export const Footer = () => {
  const { t, lang } = useLanguage();
  const basePath = lang === 'es' ? '/spanish' : '';

  return (
    <footer className="relative glass-card border-t border-border/20 py-16 px-4">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-b from-primary/5 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto max-w-7xl relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <img src='https://www.laformulacg.net/_next/image?url=%2Fimages%2Flogo%2Flogo.png&w=128&q=75' alt="La Formula Capital Group" className="h-20 w-max" />
            </div>
            <p className="text-muted-foreground leading-relaxed">
              {t('footer.tagline') || 'Enhancing business efficiency and competitiveness with specialized B2B solutions. La Formula Capital Group - Your success is our formula.'}
            </p>
          </div>

          {/* Services */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold gradient-text">{t('footer.services') || 'Services'}</h3>
            <ul className="space-y-3 text-muted-foreground">
              <li><a href="#process" className="hover:text-primary transition-colors">{t('footer.process_optimization') || 'Process Optimization'}</a></li>
              <li><a href="#services" className="hover:text-primary transition-colors">{t('footer.corporate_solutions') || 'Corporate Solutions'}</a></li>
              <li><a href="#services" className="hover:text-primary transition-colors">{t('footer.corporate_structure') || 'Corporate Structure'}</a></li>
              <li><a href="#services" className="hover:text-primary transition-colors">{t('footer.portfolio_management') || 'Portfolio Management'}</a></li>
              <li><a href="#services" className="hover:text-primary transition-colors">{t('footer.global_centralization') || 'Global Centralization'}</a></li>
              <li><a href="#services" className="hover:text-primary transition-colors">{t('footer.asset_banking') || 'Asset Banking'}</a></li>
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold gradient-text">{t('footer.company') || 'Company'}</h3>
            <ul className="space-y-3 text-muted-foreground">
              <li><Link to={`${basePath}/about`} className="hover:text-primary transition-colors">{t('footer.about_us') || 'About Us'}</Link></li>
              <li><a href="#about" className="hover:text-primary transition-colors">{t('footer.our_team') || 'Our Team'}</a></li>
              <li><a href="#about" className="hover:text-primary transition-colors">{t('footer.case_studies') || 'Case Studies'}</a></li>
              <li><Link to={`${basePath}/careers`} className="hover:text-primary transition-colors">{t('footer.careers') || 'Careers'}</Link></li>
              <li><a href="#about" className="hover:text-primary transition-colors">{t('footer.news') || 'News'}</a></li>
              <li><Link to={`${basePath}/contact`} className="hover:text-primary transition-colors">{t('footer.contact_link') || 'Contact'}</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold gradient-text">{t('footer.contact') || 'Contact'}</h3>
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-card rounded-lg flex items-center justify-center">
                  <Mail className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{t('footer.email') || 'Email'}</p>
                  <p className="text-foreground">{t('footer.email_address') || 'contact@laformulacq.net'}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-border/20 text-center">
          <p className="text-muted-foreground">
            © 2025 La Formula Capital Group. {t('footer.all_rights_reserved') || 'All rights reserved.'} | 
            <Link to={`${basePath}/privacy`} className="ml-1 hover:text-primary transition-colors">{t('footer.privacy_policy') || 'Privacy Policy'}</Link> | 
            <Link to={`${basePath}/terms`} className="ml-1 hover:text-primary transition-colors">{t('footer.terms_of_service') || 'Terms of Service'}</Link> | 
            <Link to={`${basePath}/cookies`} className="ml-1 hover:text-primary transition-colors">Cookies</Link>
          </p>
        </div>
      </div>
    </footer>
  );
};