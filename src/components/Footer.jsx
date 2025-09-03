import { FiGithub, FiTwitter, FiLinkedin, FiMail } from 'react-icons/fi';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const social = [
    {
      name: 'GitHub',
      href: 'https://github.com',
      icon: FiGithub,
    },
    {
      name: 'Twitter',
      href: 'https://twitter.com',
      icon: FiTwitter,
    },
    {
      name: 'LinkedIn',
      href: 'https://linkedin.com',
      icon: FiLinkedin,
    }
  ];

  const quickLinks = [
    { name: 'Home', href: '/' },
    { name: 'Recipes', href: '/#recipes' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <footer className="w-full bg-background border-t border-border/20 mt-12">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="md:flex md:items-center md:justify-between">
          <div className="flex justify-center md:justify-start items-center space-x-2">
            <span className="text-2xl">🥗</span>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80">
              RecipeRadar
            </span>
          </div>
          
          <div className="mt-4 md:mt-0">
            <nav className="flex flex-wrap justify-center gap-6 text-sm">
              {quickLinks.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  {item.name}
                </a>
              ))}
            </nav>
          </div>
          
          <div className="mt-6 md:mt-0 flex justify-center space-x-4">
            {social.map((item) => (
              <a
                key={item.name}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label={item.name}
              >
                <item.icon className="h-5 w-5" />
              </a>
            ))}
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-border/10 flex flex-col md:flex-row justify-between items-center">
          <p className="text-xs text-muted-foreground">
            &copy; {currentYear} RecipeRadar. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0 flex items-center space-x-6">
            <a 
              href="mailto:contact@reciperadar.com" 
              className="text-xs text-muted-foreground hover:text-foreground transition-colors flex items-center"
            >
              <FiMail className="mr-1.5 h-4 w-4" />
              contact@reciperadar.com
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
