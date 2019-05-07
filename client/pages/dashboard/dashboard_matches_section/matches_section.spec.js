import React from 'react';
import { mount } from 'enzyme';
import MatchesSection from '../dashboard_matches_section';

describe('<MatchesSection />', () => {
  it('should render correctly', () => {
    const component = mount(<MatchesSection ownEntries={[]} />);
    expect(component).toMatchSnapshot();
  });

  test.todo('render a list of entries when matched');

  test.todo('render no submissions text when no matches');
});
