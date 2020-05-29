import React from 'react';
// NOTE: We use `mount` instead of `shallow` because we need to render
// React-Bootstrap components within the DashboardSidebar component.
import { mount } from 'enzyme';
import { categories } from 'lib/data/categories';
import DashboardSidebar from '../dashboard_sidebar';

const validCategories = categories.map(category => category.short_label);

describe('<DashboardSidebar />', () => {
  it('should render a list of valid category items', () => {
    // TODO: `DashboardSidebar component should have validCategories as
    // default props, not as props (sections) passed through
    const wrapper = mount(<DashboardSidebar sections={validCategories} />);

    for (const label of validCategories) {
      expect(wrapper.containsMatchingElement(<button>{label}</button>)).toBeTruthy();
    }
  });

  test.todo('passing the correct item key to onVisibilityChange prop');
});
