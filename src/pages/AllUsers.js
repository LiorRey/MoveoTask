import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Image, message, Table } from "antd";

const AllUsers = ({ navigation }) => {
  const [data, setData] = useState([]);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    fetchData(1);
  }, []);

  const fetchData = async (page) => {
    try {
      setIsFetching(true);
      const result = await axios({
        method: "GET",
        url: `https://randomuser.me/api/?seed=foobar&page=${page}&results=10`,
        dataType: "json",
      });
      setData(result.data.results);
    } catch (error) {
      message.error("Easy cowboy!");
    } finally {
      setIsFetching(false);
    }
  };

  let navigate = useNavigate();

  async function userClick(userDetails) {
    navigate(`/user/${userDetails}`);
  }

  const columns = [
    {
      title: "Picture",
      dataIndex: "picture",
      render: (picture) =>
        picture && (
          <div>
            <Image
              preview={false}
              src={picture.thumbnail}
              style={{
                borderRadius: "50%",
              }}
            />
          </div>
        ),
    },
    {
      title: "Full Name",
      dataIndex: "name",
      render: (name) => name && `${name.first[0]}. ${name.last}`,
      sorter: (a, b) => a.name.first.charCodeAt(0) - b.name.first.charCodeAt(0),
    },
    {
      title: "Email",
      dataIndex: "email",
      render: (email) => <a href={"mailto:" + email}>{email}</a>,
      sorter: (a, b) => a.email.charCodeAt(0) - b.email.charCodeAt(0),
    },
    {
      title: "Gender",
      dataIndex: "gender",
      sorter: (a, b) => a.gender.charCodeAt(0) - b.gender.charCodeAt(0),
    },
    {
      title: "Age",
      dataIndex: "dob",
      render: (dob) => dob && dob.age,
      sorter: (a, b) => a.dob.age - b.dob.age,
    },
  ];

  return (
    <div>
      <div>
        <h1 style={{ display: "block", textAlign: "center" }}>All Users</h1>
      </div>
      <br />
      <br />
      <div
        className="tableContainer"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "80vh",
        }}
      >
        <Table
          pagination={{
            size: "small",
            style: { margin: 5 },
            defaultPageSize: 10,
            total: 50000,
            position: ["bottomRight"],
            showTotal: (total, range) =>
              `${range[0]}-${range[1]} of 50,000 items`,
            onChange: fetchData,
          }}
          loading={isFetching}
          columns={columns}
          dataSource={data.map((item, index) => ({ ...item, key: index }))}
          onRow={(record, rowIndex) => {
            return {
              onClick: (event) => {
                const userPictureReformatted = record.picture.large.replaceAll(
                  "/",
                  "-"
                );
                const userDetails = `${record.login.username}|${record.name.first}|${record.name.last}|${record.email}|${record.gender}|${record.dob.age}|${userPictureReformatted}|${record.location.coordinates.latitude}|${record.location.coordinates.longitude}`;
                userClick(userDetails);
              },
            };
          }}
        />
      </div>
    </div>
  );
};

export default AllUsers;
