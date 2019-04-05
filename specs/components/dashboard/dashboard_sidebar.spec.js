import React from 'react';
import { mount } from 'enzyme';

import { categories } from 'lib/data/categories';
import DashboardSidebar from 'components/dashboard/dashboard_sidebar';

describe('<DashboardSidebar />', () => {
  it('should render a list of valid category items', () => {
    const validCategories = categories.map(category => category.short_label);

    // TODO: `DashboardSidebar component should have validCategories as
    // default props, not as props (sections) passed through
    const wrapper = mount(<DashboardSidebar sections={validCategories} />);

    for (const label of validCategories) {
      expect(wrapper.containsMatchingElement(<button>{label}</button>)).toBeTruthy();
    }
  });
});
