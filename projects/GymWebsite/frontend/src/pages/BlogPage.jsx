import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BlogPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedArticle, setSelectedArticle] = useState(null);

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

  const categories = [
    { id: 'all', name: 'All Articles' },
    { id: 'fitness', name: 'Fitness Tips' },
    { id: 'nutrition', name: 'Nutrition' },
    { id: 'workouts', name: 'Workouts' },
    { id: 'lifestyle', name: 'Lifestyle' },
    { id: 'success', name: 'Success Stories' }
  ];

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_URL}/blog`, { params: { category: selectedCategory } });
        if (response.data.success) setArticles(response.data.data);
      } catch (err) {
        setArticles([]);
      } finally {
        setLoading(false);
      }
    };
    fetchArticles();
  }, [selectedCategory, API_URL]);

  const featured = articles.filter(a => a.featured);

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  if (selectedArticle) {
    return (
      <div className="min-h-screen bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <button onClick={() => setSelectedArticle(null)} className="flex items-center text-orange-500 hover:text-orange-600 font-medium mb-8 transition-colors">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            Back to Articles
          </button>
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-4">
              <span className="bg-orange-50 text-orange-600 text-xs px-3 py-1 rounded-full border border-orange-200 font-medium">{categories.find(c => c.id === selectedArticle.category)?.name}</span>
              <span className="text-slate-400 text-sm">{selectedArticle.readTime} min read</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 leading-tight">{selectedArticle.title}</h1>
            <div className="flex items-center gap-4 text-sm text-slate-500">
              <span className="font-medium text-slate-700">{selectedArticle.author}</span>
              <span>{formatDate(selectedArticle.publishedAt)}</span>
            </div>
          </div>
          <div className="rounded-2xl overflow-hidden mb-8">
            <img src={selectedArticle.image} alt={selectedArticle.title} className="w-full h-64 md:h-96 object-cover" />
          </div>
          <div className="prose max-w-none">
            {selectedArticle.content.split('\n\n').map((paragraph, i) => (
              <p key={i} className="text-slate-600 text-lg leading-relaxed mb-6">{paragraph}</p>
            ))}
          </div>
          {selectedArticle.tags && (
            <div className="mt-8 pt-6 border-t border-slate-200">
              <div className="flex flex-wrap gap-2">
                {selectedArticle.tags.map((tag, i) => (
                  <span key={i} className="bg-slate-100 text-slate-600 text-sm px-3 py-1 rounded-full">#{tag}</span>
                ))}
              </div>
            </div>
          )}
          <div className="mt-8 bg-slate-50 rounded-2xl p-6 text-center">
            <p className="text-slate-500 mb-3">Found this helpful?</p>
            <button onClick={() => setSelectedArticle(null)} className="bg-orange-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-orange-600 transition-colors">Read More Articles</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6">Fitness <span className="text-orange-500">Blog</span></h1>
          <p className="text-xl text-slate-500 max-w-3xl mx-auto">Expert advice, workout tips, nutrition guides, and inspiring stories.</p>
        </div>

        {loading ? (
          <div className="flex justify-center py-16"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div></div>
        ) : (
          <>
            {selectedCategory === 'all' && featured.length > 0 && (
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-slate-900 mb-6">Featured Articles</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {featured.slice(0, 3).map((a) => (
                    <div key={a.id} onClick={() => setSelectedArticle(a)} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden hover:shadow-lg transition-all cursor-pointer group">
                      <div className="h-48 overflow-hidden"><img src={a.image} alt={a.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" /></div>
                      <div className="p-6">
                        <div className="flex items-center gap-2 mb-3">
                          <span className="bg-orange-50 text-orange-600 text-xs px-2 py-1 rounded-full border border-orange-200">{categories.find(c => c.id === a.category)?.name}</span>
                          <span className="text-xs text-slate-400">{a.readTime} min</span>
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-orange-500 transition-colors">{a.title}</h3>
                        <p className="text-slate-500 mb-4 text-sm line-clamp-2">{a.excerpt}</p>
                        <div className="flex justify-between text-sm text-slate-400">
                          <span>{a.author}</span>
                          <span>{formatDate(a.publishedAt)}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex flex-wrap justify-center gap-3 mb-8">
              {categories.map((c) => (
                <button key={c.id} onClick={() => setSelectedCategory(c.id)}
                  className={`px-5 py-3 rounded-lg text-sm font-medium transition-all ${selectedCategory === c.id ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/20' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>
                  {c.name}
                </button>
              ))}
            </div>

            {articles.length === 0 ? (
              <div className="text-center py-16">
                <h3 className="text-lg font-medium text-slate-900 mb-2">No articles found</h3>
                <p className="text-slate-500">Try selecting a different category.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                {articles.map((a) => (
                  <article key={a.id} onClick={() => setSelectedArticle(a)} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden hover:shadow-lg transition-all cursor-pointer group">
                    <div className="h-48 overflow-hidden"><img src={a.image} alt={a.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" /></div>
                    <div className="p-6">
                      <div className="flex justify-between mb-2">
                        <span className="bg-slate-100 text-slate-600 text-xs px-2 py-1 rounded">{categories.find(c => c.id === a.category)?.name}</span>
                        <span className="text-sm text-slate-400">{a.readTime} min</span>
                      </div>
                      <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-orange-500 transition-colors">{a.title}</h3>
                      <p className="text-slate-500 mb-4 text-sm line-clamp-2">{a.excerpt}</p>
                      <div className="flex justify-between text-sm text-slate-400">
                        <span>{a.author}</span>
                        <span>{formatDate(a.publishedAt)}</span>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </>
        )}

        <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-10 rounded-2xl text-center shadow-xl">
          <h2 className="text-2xl font-bold mb-4">Stay Updated</h2>
          <p className="text-white/80 mb-6">Get weekly fitness tips delivered to your inbox.</p>
          <div className="max-w-md mx-auto flex gap-3">
            <input type="email" placeholder="Enter your email" className="flex-1 px-4 py-3 rounded-xl bg-white/20 border border-white/30 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50" />
            <button className="bg-white text-orange-600 px-6 py-3 rounded-xl font-semibold hover:bg-orange-50 transition-colors">Subscribe</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;