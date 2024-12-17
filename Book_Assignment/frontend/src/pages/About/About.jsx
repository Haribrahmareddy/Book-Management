import React from 'react';
import "./About.css";
import aboutImg from "../../images/about-img.jpg";

const About = () => {
  return (
    <section className='about'>
      <div className='container'>
        <div className='section-title'>
          <h2>About</h2>
        </div>

        <div className='about-content grid'>
          <div className='about-img'>
            <img src = {aboutImg} alt = "" />
          </div>
          <div className='about-text'>
            <h2 className='about-title fs-26 ls-1'>About Book Management</h2>
            <p className='fs-17'>A Book Management System (BMS) is an application used to manage the records of books in a digital system. It allows users to store and manage data related to books, such as the title, author, genre, number of pages, and published date. A typical BMS can be used in libraries, bookstores, or personal collections, providing an easy way to view, update, and organize books. In this project, we are creating a simple BMS with features like adding, editing, viewing, and deleting books, all stored in an SQLite database.</p>
            <p className='fs-17'></p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
