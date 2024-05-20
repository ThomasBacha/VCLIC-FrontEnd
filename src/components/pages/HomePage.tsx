// src/pages/HomePage.tsx
import React from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css'; // Import Font Awesome CSS
import '../css/HomePage.css';

const HomePage: React.FC = () => {
    return (
        <div className="homepage-container">
            <header className="header">
                <img src="https://www.vumc.org/marketing-engagement/sites/default/files/VUMC_Logo.jpg"
                     alt="Vanderbilt University Medical Center" className="logo"/>
                <h1 className="homepage-title">VCLIC Value Set Full-Stack Programming Exercise</h1>
            </header>
            <section className="homepage-content">
                <p>
                    Vanderbilt uses an electronic health record system which contains a range of data, including
                    diagnoses, medications, allergies, lab test results, and procedures. Data in the system is usually
                    coded,
                    meaning that we use standard identifiers to refer to important concepts in a patient’s medical
                    history.
                    For example, we might use the ICD-10 code “E11.3” to indicate that a patient has “Type 2 diabetes
                    mellitus
                    with ophthalmic complications.”
                </p>
                <p>
                    There are thousands of codes available, and we often need to use sets of them to identify a concept.
                    For example, we might want to find all patients who have a history of having a myocardial infarction
                    (heart
                    attack), and there are dozens of diagnosis codes that all mean heart attack, such as I21.0, which
                    means
                    “Acute transmural myocardial infarction of anterior wall” and I21.1 which means “Acute transmural
                    myocardial
                    infarction of inferior wall.” If we want to accurately find all patients who had a heart attack, we
                    would
                    need to assemble a complete list of relevant codes. We call these lists of codes “value sets”.
                </p>
                <p>
                    In addition to value sets of diagnoses, we also frequently create value sets of medications, such as
                    a list of all drugs that are “beta blockers.” Creating, finding, and maintaining value sets can be
                    difficult,
                    so we’re working on developing tools that help people do this more effectively.
                </p>
                <p>
                    If you’re interested, you can read this paper we wrote to learn a bit more about this problem:
                    <a href="https://academic.oup.com/jamia/article/25/11/1552/5060240" target="_blank"
                       rel="noopener noreferrer">
                        Smashing the strict hierarchy: three cases of clinical decision support malfunctions involving
                        carvedilol.
                    </a>
                </p>
                <p>
                    The task is to create a simple app that would help users find, view, compare, and select the best
                    value set for their purpose. Two possible use cases are:
                </p>
                <ul>
                    <li>Aaron wants to find a value set of beta blockers that he can use when writing a SQL query that
                        computes the percentage of patients taking a beta blocker.
                    </li>
                    <li>Becky wants to build an alert in the EHR that suggests appropriate monitoring for patients
                        taking a beta blocker.
                    </li>
                </ul>
                <p>
                    Your tool should help users see the similarities and differences in existing value sets and select
                    one for their use.
                </p>
                <p>
                    The application can be written in any programming language, but it should have a user-friendly
                    front-end (possibly web-based). Imagine that the tool would be used primarily as a prototype in
                    usability
                    studies, so performance isn’t very important as long as the overall architecture is reasonable. Feel
                    free
                    to use any libraries, frameworks, packages, tools, etc. that would help you do the task more
                    efficiently.
                </p>
            </section>
            <footer className="footer">
                <p>&copy; 2024 Vanderbilt University Medical Center</p>
            </footer>
        </div>
    );
};

export default HomePage;
