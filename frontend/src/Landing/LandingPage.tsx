import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';

const LandingPage: React.FC = () => {
    return (
        <div className="landing-page">
            <div className="landing-container">
                <div className="landing-header">
                    <h1>Data Visualization Platform</h1>
                    <p>Analyze and visualize your data with powerful charts and insights</p>
                </div>

                <div className="landing-content">
                    <div className="landing-main">
                        <div className="feature-cards">
                            <div className="feature-card">
                                <div className="feature-icon">📊</div>
                                <h3>Interactive Charts</h3>
                                <p>Create stunning visualizations with multiple chart types including line, bar, pie, and scatter plots.</p>
                            </div>
                            
                            
                            <div className="feature-card">
                                <div className="feature-icon">🎯</div>
                                <h3>Advanced Analytics</h3>
                                <p>Powerful filtering and analysis tools to dive deep into your data patterns.</p>
                            </div>
                        </div>

                        <div className="hero-section">
                            <div className="hero-text">
                                <h2>Transform Your Data Into Insights</h2>
                                <p>Join thousands of professionals who trust our platform for their data visualization needs. Get started today and unlock the power of your data.</p>
                                
                               
                            </div>
                            
                            <div className="hero-image">
                                <div className="chart-preview">
                                    <div className="preview-chart">
                                        <div className="chart-bars">
                                            <div className="bar" style={{height: '60%'}}></div>
                                            <div className="bar" style={{height: '80%'}}></div>
                                            <div className="bar" style={{height: '45%'}}></div>
                                            <div className="bar" style={{height: '90%'}}></div>
                                            <div className="bar" style={{height: '70%'}}></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="landing-sidebar">
                        <div className="auth-section">
                            <h3>Get Started</h3>
                            <p>Access your dashboard and start creating amazing visualizations</p>
                            
                            <div className="auth-buttons">
                                <Link to="/login" className="auth-button primary">
                                    <span className="button-icon">🔑</span>
                                    Sign In
                                </Link>
                                
                                <Link to="/register" className="auth-button secondary">
                                    <span className="button-icon">👤</span>
                                    Create Account
                                </Link>
                            </div>
                            
                            
                        </div>

                       
                    </div>
                </div>

                <div className="landing-footer">
                    
                    <div className="footer-bottom">
                        <p>&copy; 2025Maria Brodowska, Mateusz Brankiewicz, Adam Brzek All rights reserved.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LandingPage;