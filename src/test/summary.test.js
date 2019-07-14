import React from "react";
import SummaryCardCompo from "../component/summaryCard";
import { configure, shallow, cleanup, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import renderer from "react-test-renderer";

configure({ adapter: new Adapter() });

afterEach = () => {
  cleanup;
};

describe("<SummaryCardCompo/>", () => {
  it("chek snapshot of the component", () => {
    const wrapper = renderer
      .create(
        <SummaryCardCompo
          key={Date.now()}
          titleHead={"Reader"}
          dataInner={"<p>Loading</p>"}
          imagePath={""}
        />
      )
      .toJSON();
    expect(wrapper).toMatchSnapshot();
  });

  it("check the prop which is passed to", () => {
    const wrapper = mount(
      <SummaryCardCompo
        key={Date.now()}
        titleHead={"Reader"}
        dataInner={"<p>Loading</p>"}
        imagePath={""}
      />
    );
    expect(wrapper.find("h2").text()).toBe("Reader");
  });
});
