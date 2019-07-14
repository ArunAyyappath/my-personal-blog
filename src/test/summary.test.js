import React from "react";
import SummaryCardCompo from "../component/summaryCard";
import { configure, cleanup, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import renderer from "react-test-renderer";
import img from "../images/blog1N.jpg";

configure({ adapter: new Adapter() });

afterEach = () => {
  cleanup;
};

describe("<SummaryCardCompo/>", () => {
  it("Compare snapshot of the component", () => {
    const wrapper = renderer
      .create(
        <SummaryCardCompo
          key={Date.now()}
          titleHead={"Reader"}
          dataInner={"<p>Loading</p>"}
          imagePath={img}
        />
      )
      .toJSON();
    expect(wrapper).toMatchSnapshot();
  });

  it("Verify the existance of property value passed to component", () => {
    const wrapper = mount(
      <SummaryCardCompo
        key={Date.now()}
        titleHead={"Reader"}
        dataInner={"<p>Loading</p>"}
        imagePath={img}
      />
    );
    expect(wrapper.find("h2").text()).toBe("Reader");
  });

  it("Confirm value rendered to dom with out html tag", () => {
    const wrapper = mount(
      <SummaryCardCompo
        key={Date.now()}
        titleHead={"Reader"}
        dataInner={"<p>Loading</p>"}
        imagePath={img}
      />
    );
    expect(wrapper.containsAnyMatchingElements(["<p>Loading<p>"])).toBeFalsy();
  });
});
