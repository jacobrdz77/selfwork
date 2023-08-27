import { ClientWithProjects } from "@/types/types";
import { useEffect, useState } from "react";

const getRevenue = (clients: ClientWithProjects[]) => {
  let sum = 0;
  let monthly = 0;
  clients.forEach((client) =>
    client.projects.forEach((project) => {
      console.log(project.lumpSum);
      console.log(project.monthlyPay);
      sum = sum + Number(project.lumpSum);
      monthly = monthly + Number(project.monthlyPay);
    })
  );

  console.log("Sum: ", sum, "\nMonthly revenue: ", monthly);

  return {
    sum,
    monthly,
  };
};

const ClientStatsCards = ({ clients }: { clients: ClientWithProjects[] }) => {
  const [totalLumpSum, setLumpSum] = useState(0);
  useEffect(() => {
    if (clients.length > 0) {
      setLumpSum(getRevenue(clients).sum);
    }

    // console.log("TOTAL: ", totalLumpSum);
  }, [totalLumpSum, clients]);

  return (
    <div className="client-stats">
      <div className="card total-paid">
        <div className="number">${totalLumpSum}</div>
        <div className="title">Total Paid</div>
      </div>
      <div className="card">
        <div className="number">$0</div>
        <div className="title">Monthly Revenue</div>
      </div>
      <div className="card">
        <div className="number">
          {clients
            ? clients.filter((client) => client.status === "Active").length
            : 0}
        </div>
        <div className="title">Active Clients</div>
      </div>
    </div>
  );
};

export default ClientStatsCards;
