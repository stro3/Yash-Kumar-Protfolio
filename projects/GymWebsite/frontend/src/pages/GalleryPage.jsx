import React, { useState } from 'react';

const GalleryPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedMedia, setSelectedMedia] = useState(null);

  const categories = [
    { id: 'all', name: 'All Media' },
    { id: 'gym', name: 'Gym Equipment' },
    { id: 'classes', name: 'Classes in Action' },
    { id: 'transformations', name: 'Transformations' },
    { id: 'facilities', name: 'Facilities' }
  ];

  const mediaItems = [
    { id: 1, type: 'image', category: 'gym', title: 'State-of-the-Art Weight Room', description: 'Our fully equipped weight room.', image: '/images/weight-training.png', tags: ['weights', 'equipment'] },
    { id: 2, type: 'image', category: 'classes', title: 'Morning Yoga Session', description: 'Peaceful morning yoga class.', image: '/images/yoga-class.png', tags: ['yoga', 'wellness'] },
    { id: 3, type: 'image', category: 'transformations', title: 'Member Transformation', description: 'Amazing results through dedication.', image: '/images/personal-trainer.png', tags: ['transformation', 'success'] },
    { id: 4, type: 'image', category: 'classes', title: 'Group Fitness Class', description: 'High-energy group training.', image: '/images/group-class.png', tags: ['group', 'fitness'] },
    { id: 5, type: 'image', category: 'facilities', title: 'Modern Training Area', description: 'Premium training facilities.', image: '/images/hero-main.png', tags: ['modern', 'premium'] },
    { id: 6, type: 'image', category: 'gym', title: 'Personal Training Zone', description: 'One-on-one training area.', image: '/images/trainer-profile.png', tags: ['training', 'personal'] }
  ];

  const filteredMedia = selectedCategory === 'all' ? mediaItems : mediaItems.filter(item => item.category === selectedCategory);
  const transformationStories = mediaItems.filter(item => item.category === 'transformations');

  const MediaModal = () => {
    if (!selectedMedia) return null;
    return (
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div className="bg-gray-800 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden border border-gray-700">
          <div className="flex justify-between items-center p-4 border-b border-gray-700">
            <h3 className="text-xl font-bold text-white">{selectedMedia.title}</h3>
            <button onClick={() => setSelectedMedia(null)} className="text-gray-400 hover:text-white text-2xl">✕</button>
          </div>
          <div className="p-4">
            <img src={selectedMedia.image} alt={selectedMedia.title} className="w-full h-auto max-h-[60vh] object-contain rounded-xl" />
            <p className="text-gray-300 mt-4 mb-3">{selectedMedia.description}</p>
            <div className="flex flex-wrap gap-2">
              {selectedMedia.tags.map((tag, index) => (
                <span key={index} className="bg-blue-500/20 text-blue-400 text-xs px-2 py-1 rounded border border-blue-500/30">#{tag}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Gallery</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Explore our facilities and get inspired by transformation stories.
          </p>
        </div>

        <div className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-6 text-center">Success <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Stories</span></h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {transformationStories.map((story) => (
              <div key={story.id} className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 overflow-hidden">
                <div className="relative h-56 overflow-hidden">
                  <img src={story.image} alt={story.title} className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" />
                  <div className="absolute top-2 right-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-2 py-1 rounded text-xs font-semibold">Success Story</div>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-lg text-white mb-2">{story.title}</h3>
                  <p className="text-gray-400 text-sm mb-3">{story.description}</p>
                  <button onClick={() => setSelectedMedia(story)} className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white py-3 px-4 rounded-xl hover:from-green-600 hover:to-emerald-600 transition-all">View Story</button>
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

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-12">
          {filteredMedia.map((item) => (
            <div key={item.id} className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 overflow-hidden hover:border-blue-500/50 transition-all cursor-pointer" onClick={() => setSelectedMedia(item)}>
              <div className="relative h-48 overflow-hidden">
                <img src={item.image} alt={item.title} className="w-full h-full object-cover hover:scale-110 transition-transform duration-300" />
                <div className="absolute top-2 left-2">
                  <span className="bg-blue-500 text-white px-2 py-1 text-xs rounded">PHOTO</span>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-sm text-white mb-2">{item.title}</h3>
                <p className="text-gray-400 text-xs mb-3">{item.description}</p>
                <div className="flex flex-wrap gap-1">
                  {item.tags.slice(0, 2).map((tag, index) => (
                    <span key={index} className="bg-gray-700 text-gray-300 text-xs px-2 py-1 rounded">#{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white p-8 rounded-2xl text-center shadow-2xl shadow-blue-500/20">
          <h2 className="text-3xl font-bold mb-4">Take a Virtual Tour</h2>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">Explore our facilities from the comfort of your home.</p>
          <button className="bg-white text-blue-600 px-8 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-colors">Start Virtual Tour</button>
        </div>

        <div className="mt-12">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Community</span></h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center bg-gray-800/50 backdrop-blur-sm p-6 rounded-2xl border border-gray-700/50">
              <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 mb-2">1000+</div>
              <div className="text-gray-400">Happy Members</div>
            </div>
            <div className="text-center bg-gray-800/50 backdrop-blur-sm p-6 rounded-2xl border border-gray-700/50">
              <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-400 mb-2">500+</div>
              <div className="text-gray-400">Transformations</div>
            </div>
            <div className="text-center bg-gray-800/50 backdrop-blur-sm p-6 rounded-2xl border border-gray-700/50">
              <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mb-2">50+</div>
              <div className="text-gray-400">Classes Weekly</div>
            </div>
            <div className="text-center bg-gray-800/50 backdrop-blur-sm p-6 rounded-2xl border border-gray-700/50">
              <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-400 mb-2">12</div>
              <div className="text-gray-400">Expert Trainers</div>
            </div>
          </div>
        </div>
      </div>
      <MediaModal />
    </div>
  );
};

export default GalleryPage;