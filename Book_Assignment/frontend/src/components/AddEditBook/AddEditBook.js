import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const AddEditBook = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: '',
        authorID: '',
        genreID: '',
        pages: '',
        publishedDate: '',
    });

    useEffect(() => {
        if (id) {
            fetch(`http://localhost:5000/api/books/${id}`)
                .then((response) => response.json())
                .then((data) =>
                    setFormData({
                        title: data.Title,
                        authorID: data.AuthorID,
                        genreID: data.GenreID,
                        pages: data.Pages,
                        publishedDate: data.PublishedDate,
                    })
                );
        }
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const url = id
            ? `http://localhost:5000/api/books/${id}`
            : 'http://localhost:5000/api/books';
        const method = id ? 'PUT' : 'POST';

        fetch(url, {
            method: method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
        }).then(() => navigate('/books'));
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>{id ? 'Edit Book' : 'Add Book'}</h2>
            <label>
                Title:
                <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                />
            </label>
            <label>
                Author ID:
                <input
                    type="text"
                    name="authorID"
                    value={formData.authorID}
                    onChange={handleChange}
                    required
                />
            </label>
            <label>
                Genre ID:
                <input
                    type="text"
                    name="genreID"
                    value={formData.genreID}
                    onChange={handleChange}
                    required
                />
            </label>
            <label>
                Pages:
                <input
                    type="number"
                    name="pages"
                    value={formData.pages}
                    onChange={handleChange}
                    required
                />
            </label>
            <label>
                Published Date:
                <input
                    type="date"
                    name="publishedDate"
                    value={formData.publishedDate}
                    onChange={handleChange}
                    required
                />
            </label>
            <button type="submit">Save</button>
        </form>
    );
};

export default AddEditBook;
