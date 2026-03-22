import React from "react";
import { Helmet } from "react-helmet-async";

/**
 * Categories Manager Component
 * Provides a structured view for managing content categories.
 */
const Categories = () => {
  const categories = [
    {
      id: 1,
      name: "Literature",
      slug: "literature",
      posts: 124,
      status: "Published",
    },
    { id: 2, name: "Design", slug: "design", posts: 89, status: "Published" },
    {
      id: 3,
      name: "Technology",
      slug: "technology",
      posts: 56,
      status: "Draft",
    },
    {
      id: 4,
      name: "Philosophy",
      slug: "philosophy",
      posts: 42,
      status: "Published",
    },
  ];

  return (
    <section>
      <Helmet>
        <title>Manage Categories | INKWELL</title>
      </Helmet>

      <header>
        <h1>Category Management</h1>
        <p>Review and organize your content taxonomy.</p>
      </header>

      <table>
        <caption>Active Categories List</caption>
        <thead>
          <tr>
            <th scope="col">Category Name</th>
            <th scope="col">Slug</th>
            <th scope="col">Post Count</th>
            <th scope="col">Status</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr key={category.id}>
              <td>{category.name}</td>
              <td>
                <code>{category.slug}</code>
              </td>
              <td>{category.posts}</td>
              <td>
                <span>{category.status}</span>
              </td>
              <td>
                <nav aria-label="Row actions">
                  <button type="button">Edit</button>
                  <button type="button">Delete</button>
                </nav>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default Categories;
