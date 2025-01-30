'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import offerData from './offers.json';

interface PlanProps {
  name: string;
  price: number;
  extraPageCost: number;
  features: string[];
  color: string;
}

const PricingPlans = () => {
  const [hoveredPlan, setHoveredPlan] = useState<string | null>(null);

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Choose Your Plan</h2>
          <p className="text-xl text-gray-600">Select the perfect package for your web development needs</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {offerData.plans.map((plan: PlanProps, index) => (
            <motion.div
              key={plan.name}
              {...fadeInUp}
              transition={{ delay: index * 0.2 }}
              className={`relative rounded-2xl shadow-xl overflow-hidden transform transition-all duration-300 hover:scale-105 ${
                hoveredPlan === plan.name ? 'z-10' : 'z-0'
              }`}
              onMouseEnter={() => setHoveredPlan(plan.name)}
              onMouseLeave={() => setHoveredPlan(null)}
            >
              <div className='bg-blue-200 p-8 h-full'>
                <div className="text-center">
                  <h3 className={`text-2xl font-bold mb-2 ${
                    plan.name === 'Platinum' ? 'dtext-gray-700' : 'text-gray-900'
                  }`}>
                    {plan.name}
                  </h3>
                  <div className={`text-4xl font-bold mb-4 ${
                    plan.name === 'Platinum' ? 'dtext-gray-700' : 'text-gray-900'
                  }`}>
                    ₹{plan.price.toLocaleString()}
                  </div>
                  <p className={`text-sm mb-6 ${
                    plan.name === 'Platinum' ? 'text-gray-700' : 'text-gray-600'
                  }`}>
                    Extra page: ₹{plan.extraPageCost.toLocaleString()}
                  </p>
                </div>

                <div className="space-y-4">
                  {plan.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center">
                      <Check className={`h-5 w-5 mr-3 ${
                        plan.name === 'Platinum' ? 'dtext-gray-700' : 'text-green-500'
                      }`} />
                      <span className={`${
                        plan.name === 'Platinum' ? 'dtext-gray-700' : 'text-gray-700'
                      } text-sm`}>
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>                
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PricingPlans;