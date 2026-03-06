import React, { useState } from 'react';

const BlogPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Articles' },
    { id: 'fitness', name: 'Fitness Tips' },
    { id: 'nutrition', name: 'Nutrition' },
    { id: 'workouts', name: 'Workouts' },
    { id: 'lifestyle', name: 'Lifestyle' },
    { id: 'success', name: 'Success Stories' }
  ];

  const articles = [
    { id: 1, title: '10 Essential Tips for Beginner Gym-Goers', excerpt: 'Starting your fitness journey can be overwhelming. Here are the fundamental tips every beginner should know.', category: 'fitness', author: 'Sarah Johnson', authorRole: 'Certified Personal Trainer', publishDate: '2023-12-10', readTime: '5 min read', image: '/images/personal-trainer.png', tags: ['beginner', 'gym', 'tips'], featured: true },
    { id: 2, title: 'The Science Behind HIIT: Why It Works', excerpt: 'High-Intensity Interval Training has taken the fitness world by storm. Discover the scientific principles.', category: 'workouts', author: 'Dr. Mike Chen', authorRole: 'Exercise Physiologist', publishDate: '2023-12-08', readTime: '7 min read', image: '/images/weight-training.png', tags: ['HIIT', 'science', 'cardio'], featured: false },
    { id: 3, title: 'Meal Prep Made Simple: A Week of Healthy Eating', excerpt: 'Transform your nutrition with easy meal prep strategies.', category: 'nutrition', author: 'Maria Garcia', authorRole: 'Registered Dietitian', publishDate: '2023-12-05', readTime: '6 min read', image: '/images/hero-main.png', tags: ['meal-prep', 'nutrition'], featured: true },
    { id: 4, title: "From Couch to 5K: Member Transformation", excerpt: 'Meet John, who went from sedentary to running his first 5K in 12 weeks.', category: 'success', author: 'Emma Wilson', authorRole: 'Fitness Coach', publishDate: '2023-12-03', readTime: '4 min read', image: '/images/trainer-profile.png', tags: ['transformation', 'running'], featured: false },
    { id: 5, title: 'Building Mental Resilience Through Exercise', excerpt: 'Exercise is not just about physical health. Discover how workouts strengthen mental resilience.', category: 'lifestyle', author: 'Dr. Lisa Anderson', authorRole: 'Sports Psychologist', publishDate: '2023-12-01', readTime: '8 min read', image: '/images/yoga-class.png', tags: ['mental-health', 'wellness'], featured: false },
    { id: 6, title: 'The Perfect Pre and Post-Workout Nutrition', excerpt: 'Maximize your workout results with proper nutrition timing.', category: 'nutrition', author: 'David Brown', authorRole: 'Sports Nutritionist', publishDate: '2023-11-28', readTime: '6 min read', image: '/images/group-class.png', tags: ['nutrition', 'performance'], featured: true }
  ];

  const filteredArticles = selectedCategory === 'all' ? articles : articles.filter(article => article.category === selectedCategory);
  const featuredArticles = articles.filter(article => article.featured);

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Fitness <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Blog</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Expert advice, workout tips, and inspiring success stories.
          </p>
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">Featured Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredArticles.map((article) => (
              <div key={article.id} className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 overflow-hidden hover:border-blue-500/50 transition-all">
                <div className="h-48 overflow-hidden">
                  <img src={article.image} alt={article.title} className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" />
                </div>
                <div className="p-6">
                  <div className="flex items-center mb-2">
                    <span className="bg-blue-500/20 text-blue-400 text-xs px-2 py-1 rounded-full border border-blue-500/30">
                      {categories.find(cat => cat.id === article.category)?.name}
                    </span>
                    <span className="text-yellow-400 ml-2">⭐</span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{article.title}</h3>
                  <p className="text-gray-400 mb-4">{article.excerpt}</p>
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <div><p className="font-medium text-gray-300">{article.author}</p><p className="text-gray-500">{article.authorRole}</p></div>
                    <div className="text-right"><p>{article.readTime}</p></div>
                  </div>
                  <button className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white py-3 px-4 rounded-xl hover:from-blue-600 hover:to-cyan-600 transition-all">Read More</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {categories.map((category) => (
            <button key={category.id} onClick={() => setSelectedCategory(category.id)}
              className={`px-5 py-3 rounded-xl transition-all ${selectedCategory === category.id ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg shadow-blue-500/25' : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 border border-gray-700/50'}`}>
              {category.name}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {filteredArticles.map((article) => (
            <article key={article.id} className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 overflow-hidden hover:border-blue-500/50 transition-all">
              <div className="h-48 overflow-hidden">
                <img src={article.image} alt={article.title} className="w-full h-full object-cover hover:scale-110 transition-transform duration-300" />
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="bg-gray-700 text-gray-300 text-xs px-2 py-1 rounded-full">{categories.find(cat => cat.id === article.category)?.name}</span>
                  <span className="text-sm text-gray-500">{article.readTime}</span>
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{article.title}</h3>
                <p className="text-gray-400 mb-4">{article.excerpt}</p>
                <div className="flex flex-wrap gap-1 mb-4">
                  {article.tags.map((tag, index) => (
                    <span key={index} className="bg-blue-500/10 text-blue-400 text-xs px-2 py-1 rounded border border-blue-500/20">#{tag}</span>
                  ))}
                </div>
                <button className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white py-3 px-4 rounded-xl hover:from-blue-600 hover:to-cyan-600 transition-all">Read Article</button>
              </div>
            </article>
          ))}
        </div>

        <div className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white p-8 rounded-2xl text-center shadow-2xl shadow-blue-500/20">
          <h2 className="text-2xl font-bold mb-4">Stay Updated with Our Latest Articles</h2>
          <p className="text-blue-100 mb-6">Get weekly fitness tips and nutrition advice delivered to your inbox.</p>
          <div className="max-w-md mx-auto flex gap-3">
            <input type="email" placeholder="Enter your email" className="flex-1 px-4 py-3 rounded-xl bg-white/20 backdrop-blur-sm border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50" />
            <button className="bg-white text-blue-600 px-6 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-colors">Subscribe</button>
          </div>
        </div>

        <div className="mt-12">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">Popular <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Topics</span></h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-2xl border border-gray-700/50 text-center hover:border-blue-500/50 transition-all">
              <div className="w-16 h-16 mx-auto mb-3 rounded-xl overflow-hidden"><img src="/images/weight-training.png" alt="Strength" className="w-full h-full object-cover" /></div>
              <h3 className="font-semibold text-white">Strength Training</h3>
              <p className="text-sm text-gray-400">Build muscle</p>
            </div>
            <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-2xl border border-gray-700/50 text-center hover:border-blue-500/50 transition-all">
              <div className="w-16 h-16 mx-auto mb-3 rounded-xl overflow-hidden"><img src="/images/hero-main.png" alt="Nutrition" className="w-full h-full object-cover" /></div>
              <h3 className="font-semibold text-white">Nutrition</h3>
              <p className="text-sm text-gray-400">Healthy eating</p>
            </div>
            <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-2xl border border-gray-700/50 text-center hover:border-blue-500/50 transition-all">
              <div className="w-16 h-16 mx-auto mb-3 rounded-xl overflow-hidden"><img src="/images/group-class.png" alt="Cardio" className="w-full h-full object-cover" /></div>
              <h3 className="font-semibold text-white">Cardio Workouts</h3>
              <p className="text-sm text-gray-400">Heart health</p>
            </div>
            <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-2xl border border-gray-700/50 text-center hover:border-blue-500/50 transition-all">
              <div className="w-16 h-16 mx-auto mb-3 rounded-xl overflow-hidden"><img src="/images/yoga-class.png" alt="Yoga" className="w-full h-full object-cover" /></div>
              <h3 className="font-semibold text-white">Mind & Body</h3>
              <p className="text-sm text-gray-400">Mental wellness</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;