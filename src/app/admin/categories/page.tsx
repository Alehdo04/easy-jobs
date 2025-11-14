'use client';

import { useState } from 'react';
import { Plus, Edit, Trash2, Tag, Folder } from 'lucide-react';

interface Category {
  id: string;
  name: string;
  subcategories: string[];
  tags: string[];
  gigsCount: number;
}

export default function CategoriesManagement() {
  const [categories, setCategories] = useState<Category[]>([
    {
      id: '1',
      name: 'Design Gráfico',
      subcategories: ['Logo Design', 'Branding', 'Ilustração', 'Design de Embalagem'],
      tags: ['logo', 'design', 'criativo', 'visual', 'marca'],
      gigsCount: 234,
    },
    {
      id: '2',
      name: 'Programação',
      subcategories: ['Web Development', 'Mobile Apps', 'WordPress', 'E-commerce'],
      tags: ['código', 'desenvolvimento', 'site', 'app', 'programação'],
      gigsCount: 456,
    },
    {
      id: '3',
      name: 'Marketing Digital',
      subcategories: ['SEO', 'Social Media', 'Email Marketing', 'Anúncios'],
      tags: ['marketing', 'digital', 'seo', 'redes sociais', 'tráfego'],
      gigsCount: 189,
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    subcategories: '',
    tags: '',
  });

  const handleCreate = () => {
    setEditingCategory(null);
    setFormData({ name: '', subcategories: '', tags: '' });
    setShowModal(true);
  };

  const handleEdit = (category: Category) => {
    setEditingCategory(category);
    setFormData({
      name: category.name,
      subcategories: category.subcategories.join(', '),
      tags: category.tags.join(', '),
    });
    setShowModal(true);
  };

  const handleDelete = (categoryId: string) => {
    if (confirm('Tem certeza que deseja excluir esta categoria?')) {
      setCategories(categories.filter(c => c.id !== categoryId));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newCategory: Category = {
      id: editingCategory?.id || Date.now().toString(),
      name: formData.name,
      subcategories: formData.subcategories.split(',').map(s => s.trim()).filter(Boolean),
      tags: formData.tags.split(',').map(t => t.trim()).filter(Boolean),
      gigsCount: editingCategory?.gigsCount || 0,
    };

    if (editingCategory) {
      setCategories(categories.map(c => c.id === editingCategory.id ? newCategory : c));
    } else {
      setCategories([...categories, newCategory]);
    }

    setShowModal(false);
    setFormData({ name: '', subcategories: '', tags: '' });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gestão de Categorias</h1>
          <p className="text-gray-600 mt-2">Gerencie categorias, subcategorias e tags</p>
        </div>
        <button
          onClick={handleCreate}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-5 h-5" />
          <span>Nova Categoria</span>
        </button>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <div
            key={category.id}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Folder className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">{category.name}</h3>
                  <p className="text-sm text-gray-500">{category.gigsCount} serviços</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleEdit(category)}
                  className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(category.id)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Subcategories */}
            <div className="mb-4">
              <label className="text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2 block">
                Subcategorias
              </label>
              <div className="flex flex-wrap gap-2">
                {category.subcategories.map((sub, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 text-xs font-medium bg-purple-100 text-purple-800 rounded-full"
                  >
                    {sub}
                  </span>
                ))}
              </div>
            </div>

            {/* Tags */}
            <div>
              <label className="text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2 block">
                Tags
              </label>
              <div className="flex flex-wrap gap-2">
                {category.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded-full flex items-center"
                  >
                    <Tag className="w-3 h-3 mr-1" />
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Create/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">
                {editingCategory ? 'Editar Categoria' : 'Nova Categoria'}
              </h2>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {/* Name */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Nome da Categoria
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Ex: Design Gráfico"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Subcategories */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Subcategorias (separadas por vírgula)
                </label>
                <textarea
                  value={formData.subcategories}
                  onChange={(e) => setFormData({ ...formData, subcategories: e.target.value })}
                  placeholder="Ex: Logo Design, Branding, Ilustração"
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Tags */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Tags (separadas por vírgula)
                </label>
                <textarea
                  value={formData.tags}
                  onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                  placeholder="Ex: logo, design, criativo, visual"
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Actions */}
              <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  {editingCategory ? 'Salvar Alterações' : 'Criar Categoria'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
