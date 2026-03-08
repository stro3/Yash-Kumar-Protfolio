import React, { useState } from 'react';

const GalleryPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedMedia, setSelectedMedia] = useState(null);

  const categories = [
    { id: 'all', name: 'All' },
    { id: 'gym', name: 'Equipment' },
    { id: 'classes', name: 'Classes' },
    { id: 'transformations', name: 'Transformations' },
    { id: 'facilities', name: 'Facilities' }
  ];

  const mediaItems = [
    { id: 1, category: 'gym', title: 'Weight Room', description: 'Fully equipped weight room.', image: 'https://images.unsplash.com/photo-1534258936925-c58bed479fcb?w=600&q=80' },
    { id: 2, category: 'classes', title: 'Morning Yoga', description: 'Peaceful morning yoga.', image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&q=80' },
    { id: 3, category: 'transformations', title: 'Member Transformation', description: 'Amazing results.', image: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=600&q=80' },
    { id: 4, category: 'classes', title: 'Group Fitness', description: 'High-energy group training.', image: 'https://images.unsplash.com/photo-1549060279-7e168fcee0c2?w=600&q=80' },
    { id: 5, category: 'facilities', title: 'Training Area', description: 'Premium training facilities.', image: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=600&q=80' },
    { id: 6, category: 'gym', title: 'Personal Training Zone', description: 'One-on-one training area.', image: 'https://images.unsplash.com/photo-1571388208497-71bedc66e932?w=600&q=80' },
    { id: 7, category: 'facilities', title: 'Cardio Section', description: 'Modern cardio equipment.', image: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=600&q=80' },
    { id: 8, category: 'classes', title: 'CrossFit Session', description: 'Intense CrossFit training.', image: 'https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=600&q=80' }
  ];

  const filtered = selectedCategory === 'all' ? mediaItems : mediaItems.filter(m => m.category === selectedCategory);

  const Modal = () => {
    if (!selectedMedia) return null;
    return (
      <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={() => setSelectedMedia(null)}>
        <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl" onClick={e => e.stopPropagation()}>
          <div className="flex justify-between items-center p-4 border-b border-slate-200">
            <h3 className="text-xl font-bold text-slate-900">{selectedMedia.title}</h3>
            <button onClick={() => setSelectedMedia(null)} className="text-slate-400 hover:text-slate-600 text-2xl">✕</button>
          </div>
          <img src={selectedMedia.image} alt={selectedMedia.title} className="w-full max-h-[60vh] object-contain" />
          <div className="p-4"><p className="text-slate-600">{selectedMedia.description}</p></div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6"><span className="text-orange-500">Gallery</span></h1>
          <p className="text-xl text-slate-500 max-w-3xl mx-auto">Explore our facilities and get inspired.</p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {categories.map((c) => (
            <button key={c.id} onClick={() => setSelectedCategory(c.id)}
              className={`px-5 py-3 rounded-lg text-sm font-medium transition-all ${selectedCategory === c.id ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/20' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>
              {c.name}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-12">
          {filtered.map((item) => (
            <div key={item.id} className="group relative rounded-2xl overflow-hidden aspect-square cursor-pointer" onClick={() => setSelectedMedia(item)}>
              <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <h3 className="font-semibold text-white text-sm">{item.title}</h3>
                <p className="text-slate-300 text-xs">{item.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center bg-slate-50 p-6 rounded-2xl"><div className="text-3xl font-bold text-orange-500 mb-2">1000+</div><div className="text-slate-600">Happy Members</div></div>
          <div className="text-center bg-slate-50 p-6 rounded-2xl"><div className="text-3xl font-bold text-orange-500 mb-2">500+</div><div className="text-slate-600">Transformations</div></div>
          <div className="text-center bg-slate-50 p-6 rounded-2xl"><div className="text-3xl font-bold text-orange-500 mb-2">50+</div><div className="text-slate-600">Classes Weekly</div></div>
          <div className="text-center bg-slate-50 p-6 rounded-2xl"><div className="text-3xl font-bold text-orange-500 mb-2">12</div><div className="text-slate-600">Expert Trainers</div></div>
        </div>
      </div>
      <Modal />
    </div>
  );
};

export default GalleryPage;