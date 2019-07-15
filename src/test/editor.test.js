import React from "react";
import Editor from "../component/editor";
import { configure, shallow, cleanup, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import renderer from "react-test-renderer";

configure({ adapter: new Adapter() });

afterEach = () => {
  cleanup;
};

describe("<Editor/>", () => {
  it("verify editor", () => {
    const stylesMain = ["static", "100%", "#ffffffb3", "0", "500px"];
    const wrapper = shallow(<Editor stylesChanger={stylesMain} />);
  });
});
