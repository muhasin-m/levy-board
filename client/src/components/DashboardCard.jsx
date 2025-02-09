import { Card} from "react-bootstrap";
import { FaChartLine } from "react-icons/fa";

const DashboardCard = ({ title, value, icon }) => {
  return (
    <Card className="text-center">
      <Card.Body>
        {icon && <div className="mb-2">{icon}</div>}

        <Card.Title>{title}</Card.Title>
        <Card.Text>{value} </Card.Text>
      </Card.Body>
    </Card>
  );
};
export default DashboardCard;
