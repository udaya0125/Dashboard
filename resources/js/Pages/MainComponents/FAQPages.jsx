import React, { useState } from 'react';
import Wrapper from '../BarComponents/Wrapper';
import { ChevronDown, HelpCircle, ShieldCheck, LifeBuoy } from 'lucide-react';

const FAQPages = () => {
  const [activeQuestion, setActiveQuestion] = useState(null);
  const [activeSection, setActiveSection] = useState('general');

  const toggleQuestion = (index) => {
    setActiveQuestion(activeQuestion === index ? null : index);
  };

  const generalQuestions = [
    {
      question: "What is Lorem Ipsum?",
      answer: "New common language will be more simple and regular than the existing European languages. It will be as simple as occidental."
    },
    {
      question: "Where does it come from?",
      answer: "Everyone realizes why a new common language would be desirable one could refuse to pay expensive translators."
    },
    {
      question: "Where can I get some?",
      answer: "If several languages coalesce, the grammar of the resulting language is more simple and regular than that of the individual languages."
    },
    {
      question: "Why do we use it?",
      answer: "Their separate existence is a myth. For science, music, sport, etc, Europe uses the same vocabulary."
    },
    {
      question: "Where can I get some?",
      answer: "To an English person, it will seem like simplified English, as a skeptical Cambridge friend of mine told me what Occidental"
    }
  ];

  const privacyPolicy = [
    {
      question: "What information do we collect?",
      answer: "We collect information from you when you register on our site, place an order, subscribe to our newsletter or fill out a form."
    },
    {
      question: "How do we use your information?",
      answer: "Any of the information we collect from you may be used to personalize your experience, improve our website, improve customer service, etc."
    },
    {
      question: "How do we protect your information?",
      answer: "We implement a variety of security measures to maintain the safety of your personal information."
    }
  ];

  const supportQuestions = [
    {
      question: "How can I contact support?",
      answer: "You can contact our support team via email at support@example.com or through our contact form."
    },
    {
      question: "What are your support hours?",
      answer: "Our support team is available Monday to Friday, 9am to 5pm EST."
    },
    {
      question: "Do you offer phone support?",
      answer: "Currently we only offer email and chat support."
    }
  ];

  const getActiveQuestions = () => {
    switch (activeSection) {
      case 'general':
        return generalQuestions;
      case 'privacy':
        return privacyPolicy;
      case 'support':
        return supportQuestions;
      default:
        return generalQuestions;
    }
  };

  const getSectionTitle = () => {
    switch (activeSection) {
      case 'general':
        return "General Questions";
      case 'privacy':
        return "Privacy Policy";
      case 'support':
        return "Support";
      default:
        return "General Questions";
    }
  };

  return (
    <Wrapper>
      <div className='py-6 px-4 md:px-6 lg:px-10 w-full md:w-[82%] ml-auto mt-20 md:mt-0 pt-28'>
        <div className="flex min-h-screen bg-gray-50">
          {/* Sidebar */}
          <div className="w-64 bg-white shadow-sm hidden md:block">
            {/* General Questions */}
            <div 
              className={`p-6 cursor-pointer transition-colors ${activeSection === 'general' ? 'bg-blue-600 text-white' : 'hover:bg-gray-50'}`}
              onClick={() => setActiveSection('general')}
            >
              <div className="text-center">
                <div className="text-3xl font-light mb-2 flex justify-center">
                  <HelpCircle size={36} className={activeSection === 'general' ? 'text-white' : 'text-gray-600'} />
                </div>
                <div className={`text-sm font-medium ${activeSection === 'general' ? 'text-white' : 'text-gray-700'}`}>General Questions</div>
              </div>
            </div>
            
            {/* Privacy Policy */}
            <div 
              className={`p-6 border-b border-gray-100 cursor-pointer transition-colors ${activeSection === 'privacy' ? 'bg-blue-600 text-white' : 'hover:bg-gray-50'}`}
              onClick={() => setActiveSection('privacy')}
            >
              <div className="flex flex-col items-center text-center">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-3 ${activeSection === 'privacy' ? 'border-2 border-white' : 'border-2 border-gray-300'}`}>
                  <ShieldCheck size={24} className={activeSection === 'privacy' ? 'text-white' : 'text-gray-600'} />
                </div>
                <div className={`text-sm font-medium ${activeSection === 'privacy' ? 'text-white' : 'text-gray-700'}`}>Privacy Policy</div>
              </div>
            </div>
            
            {/* Support */}
            <div 
              className={`p-6 cursor-pointer transition-colors ${activeSection === 'support' ? 'bg-blue-600 text-white' : 'hover:bg-gray-50'}`}
              onClick={() => setActiveSection('support')}
            >
              <div className="flex flex-col items-center text-center">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-3 ${activeSection === 'support' ? 'bg-blue-500' : 'bg-gray-100'}`}>
                  <LifeBuoy size={24} className={activeSection === 'support' ? 'text-white' : 'text-gray-600'} />
                </div>
                <div className={`text-sm font-medium ${activeSection === 'support' ? 'text-white' : 'text-gray-700'}`}>Support</div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 p-8">
            <h1 className="text-2xl font-semibold text-gray-800 mb-8">{getSectionTitle()}</h1>
            
            <div className="space-y-4">
              {getActiveQuestions().map((item, index) => (
                <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200">
                  <button
                    onClick={() => toggleQuestion(index)}
                    className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center">
                      <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mr-4">
                        <span className="text-green-600 text-sm">?</span>
                      </div>
                      <span className="text-gray-800 font-medium">{item.question}</span>
                    </div>
                    <ChevronDown 
                      size={20}
                      className={`text-gray-400 transition-transform ${activeQuestion === index ? 'rotate-180' : ''}`}
                    />
                  </button>
                  
                  {activeQuestion === index && (
                    <div className="px-6 pb-6">
                      <div className="pl-10">
                        <p className="text-gray-600 leading-relaxed">{item.answer}</p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
}

export default FAQPages;