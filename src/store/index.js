import { configureStore, createSlice } from '@reduxjs/toolkit';

const widgetSlice = createSlice({
  name: 'widgets',
  initialState: {
    marketing: [
      { title: 'Social Media Campaign', text: 'Plan and execute a social media strategy for the upcoming product launch.' },
      { title: 'SEO Optimization', text: 'Improve search engine rankings by optimizing on-page content and meta tags.' },
      { title: 'Email Newsletter', text: 'Design and send out the monthly newsletter to engage with subscribers.' }
    ],
    sales: [
      { title: 'Lead Generation', text: 'Identify and target potential clients for the new service offerings.' },
      { title: 'Sales Training', text: 'Conduct training sessions for the sales team on the new CRM system.' }
    ],
    development: [
      { title: 'Feature Development', text: 'Implement the new user authentication system.' },
      { title: 'Bug Fixing', text: 'Resolve high-priority bugs reported in the latest release.' },
      { title: 'Code Review', text: 'Review code submissions from the team to ensure quality and consistency.' },
      { title: 'Performance Optimization', text: 'Optimize the application for faster load times and responsiveness.' }
    ],
    humanResources: [
      { title: 'Recruitment Drive', text: 'Plan and execute the recruitment drive for the new project team.' }
    ],
    design: [
      { title: 'UI/UX Design', text: 'Create wireframes and prototypes for the new mobile app.' },
      { title: 'Branding', text: 'Update the branding guidelines to align with the company’s new vision.' },
      { title: 'Graphic Design', text: 'Design promotional materials for the upcoming product launch.' },
      { title: 'User Testing', text: 'Conduct user testing sessions to gather feedback on the new design.' }
    ],
  },
  reducers: {
    addWidget: (state, action) => {
      // Add the widget to the appropriate key
      const { key, widget } = action.payload;
      state[key].push(widget);
    },
    removeWidget: (state, action) => {
      const { key, index } = action.payload;
      state[key].splice(index, 1);
    }
  }
});

export const { addWidget, removeWidget } = widgetSlice.actions;

const store = configureStore({
  reducer: {
    widgets: widgetSlice.reducer
  }
});

export default store;
