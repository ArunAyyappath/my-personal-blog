import React from "react";
import ContentDecider from "../component/blogContentViewer";
import { configure, shallow, cleanup, mount, render } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import renderer from "react-test-renderer";
import firebase from "../component/fireStore";
import "firebase/app";
import "firebase/auth";

configure({ adapter: new Adapter() });

beforeAll(async () => {
  const authFire = firebase.auth();
  await authFire.signInWithEmailAndPassword("croft8262@gmail.com", "12345678");
});

afterAll(() => {
  firebase.auth().signOut();
});

afterEach = () => {
  cleanup;
};

describe("<ContentDecider/>", () => {
  it("renders correctly", () => {
    const wrapper = renderer.create(<ContentDecider />).toJSON();
    expect(wrapper).toMatchSnapshot();
  });

  it("ensure static  component have been rendered for the first time", async () => {
    const wrapper = await mount(<ContentDecider />);
    expect(wrapper.find("span").text()).toBe("Your Library Is Empty");
  });
});
