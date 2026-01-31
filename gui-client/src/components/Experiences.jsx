//components/Experience.jsx

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listExperiences } from '../redux/actions/experienceActions';
import { FaBriefcase, FaInfo } from 'react-icons/fa';

const Experiences = () => {
  const dispatch = useDispatch();
  const { experiences, loading, error } = useSelector((state) => state.experienceList);

  useEffect(() => {
    dispatch(listExperiences());
  }, [dispatch]);

  return (
    <section id="experiences" className="section-padding bg-gray-100 dark:bg-gray-900 transition-colors duration-500">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
            My <span className="text-purple-600 dark:text-purple-400">Experiences</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg">Nothing here yet</p>
          <p className="text-gray-200 mt-10 md:mt-40 text-lg font-bold">
                      <FaInfo className="inline mr-2 text-black bg-white p-1 rounded-full w-5 h-5"/>This Site is under Continous Integration & Delivery/Deployment (CI/CD)
                    </p>
        </div>

        {loading ? <div>Loading...</div> : error ? <div>{error}</div> : (
          <div className="space-y-8">
            {experiences.map((exp) => (
              <div key={exp._id} className="p-6 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-4 mb-4">
                  <FaBriefcase className="text-3xl text-purple-600 dark:text-purple-400" />
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">{exp.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400">{exp.company} | {exp.period}</p>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-4">{exp.description}</p>
                <ul className="list-disc pl-6 space-y-2">
                  {exp.achievements.map((ach, idx) => <li key={idx} className="text-gray-600 dark:text-gray-400">{ach}</li>)}
                </ul>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Experiences;