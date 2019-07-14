import React from "react";
import CustomSignUp from "../component/signUp";
import { configure, shallow, cleanup, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import renderer from "react-test-renderer";

configure({ adapter: new Adapter() });

afterEach = () => {
  cleanup;
};

describe("<CustomSignUp/>", () => {
  it("renders correctly", () => {
    const wrapper = renderer.create(<CustomSignUp />).toJSON();
    expect(wrapper).toMatchSnapshot();
  });

  it("check-signup-function-call-times", () => {
    const wrapper = shallow(<CustomSignUp />);
    const spy = jest.spyOn(wrapper.instance(), "onclickHandle");
    const spyFnc = jest.spyOn(wrapper.instance(), "authListner");
    wrapper.setState({
      userIdSignUp: "arunayyappath@gmail.com",
      passwordIdSignUp: "123456"
    });
    wrapper.find("button").simulate("click");
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spyFnc).toHaveBeenCalledTimes(1);
  });

  it("verify-signin-userId", () => {
    const wrapper = mount(<CustomSignUp />);
    const container = wrapper.find("input[type='text']");
    container.find("input[type='text']").simulate("change", {
      target: { id: "userIdSignUp", value: "Fakeuser@gmail.com" }
    });
    expect(wrapper.instance().state.userIdSignUp).toBe("Fakeuser@gmail.com");
  });

  it("verify-signin-passwordId", () => {
    const wrapper = mount(<CustomSignUp />);
    const container = wrapper.find("input[type='text']");
    container.find("input[type='text']").simulate("change", {
      target: { id: "passwordIdSignUp", value: "12345678" }
    });
    expect(wrapper.instance().state.passwordIdSignUp).toBe("12345678");
  });
});
