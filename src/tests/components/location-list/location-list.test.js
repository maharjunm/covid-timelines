import Adapter from 'enzyme-adapter-react-16';
import { configure, shallow } from 'enzyme';
import ChartsContainer from '../../../components/charts';
import LocationList from '../../../components/location-list';

jest.mock('./../../../utils/get-country-details.js', () => {
    return {
        __esModule: true,
        default: () => {
            return {
                confirmedCases: [],
                deathCases: [],
                recoveredCases: [],
            }
        },
        getAllCases: () => {
            return []
        }
    }
});
jest.mock("canvasjs-react-charts", () => {
    return {
      CanvasJSChart: () => (<div> </div>)
    }
  });
configure({ adapter: new Adapter() });
describe("Location List", () => {
    test('should load one dropdown by default', () => {
        const props = {
            country: {
                states: [],
                country: "India",
            }
        }
        const wrapper = shallow(<LocationList {...props} />);
        expect(wrapper.find('Dropdown').length).toBe(1);
    });

    test('should load two dropdown when state is available', () => {
        const props = {
            country: {
                states: ["AP"],
                country: "India",
            }
        }
        const wrapper = shallow(<LocationList {...props} />);
        expect(wrapper.find('Dropdown').length).toBe(2);
    });
})
