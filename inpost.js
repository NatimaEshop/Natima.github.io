(function (shoptet) {
	if (getShoptetDataLayer().pageType === "billingAndShipping") {
		var myShippingName = "in-post-bm";
		var modalContent = document.createElement("div");
		var chooseLink = document.createElement("a");
		var invalidateLink = document.createElement("a");
		const customHtml = `<div id="c-wt-inpost-shipping-wrapper"><inpost-geowidget id='geowidget' onpoint='onpointselect' token='eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJzQlpXVzFNZzVlQnpDYU1XU3JvTlBjRWFveFpXcW9Ua2FuZVB3X291LWxvIn0.eyJleHAiOjIwMzU0NDIzODcsImlhdCI6MTcyMDA4MjM4NywianRpIjoiYTA0MzUwNDMtMWZkOC00OTBiLTk5YjgtMTAzYzhlZTUyZTJhIiwiaXNzIjoiaHR0cHM6Ly9sb2dpbi5pbnBvc3QucGwvYXV0aC9yZWFsbXMvZXh0ZXJuYWwiLCJzdWIiOiJmOjEyNDc1MDUxLTFjMDMtNGU1OS1iYTBjLTJiNDU2OTVlZjUzNTptWWhzYldBWm41b2c0SFpLOXJPdjJrSndfaU9Ib01CMDAxdWhhOEhOWlcwIiwidHlwIjoiQmVhcmVyIiwiYXpwIjoic2hpcHgiLCJzZXNzaW9uX3N0YXRlIjoiNDJhNjY1MGItMWUyYy00MjRiLWFiYTctNjBlMzk4ZjJiOTRmIiwic2NvcGUiOiJvcGVuaWQgYXBpOmFwaXBvaW50cyIsInNpZCI6IjQyYTY2NTBiLTFlMmMtNDI0Yi1hYmE3LTYwZTM5OGYyYjk0ZiIsImFsbG93ZWRfcmVmZXJyZXJzIjoid2Vib3R2dXJjaS5teXNob3B0ZXQuY29tLCouYnJhaW5tYXJrZXQucGwsYnJhaW5tYXJrZXQucGwiLCJ1dWlkIjoiNzIyMDhjMzYtODYwZC00ZjI5LTk4NDktOTZhNTliMTk5NzFiIn0.i_jkhsManAcdFEB27i_MYGThWJuO4n2mXKrjHUlKk6dmepiKI7FCGv_Hmlqwq3cwKk3Mm_u3spMMnJH4nAfk5JDjzJuxRTY6TEeJqEVt4jzSI7Ng962y_LCPt692bPLwqu13zLeunjXbRyaKSnzJpT7LadzM-4zhvsHTL5T0kv3ehJB7Fc4NBdPm5_MD0yhrPX8JnU7GXIL519AgFiPkErETf-61q1k3VNxRO6mfi-kMCAC8sINgw0bdG7HRqIyXfO1BfwzA9Bfbt2oudsw9FQAuhb0lhAUMnxDkIZdtUVy_2U7gr66CaPwlK9L0vx86hrAl_nto3VfielOBkYXwPg' language='pl' config='parcelCollect'></inpost-geowidget></div>`;
		var customHtmlWrapper = document.createElement("div");
		customHtmlWrapper.innerHTML = customHtml;

		chooseLink.innerText = "Choose shipping method\n";
		chooseLink.setAttribute("href", "#");
		invalidateLink.innerText = "Invalidate shipping method";
		invalidateLink.setAttribute("href", "#");

		modalContent.appendChild(customHtmlWrapper);
		// modalContent.appendChild(chooseLink);
		//modalContent.appendChild(invalidateLink);

		shoptet.externalShipping = shoptet.externalShipping || {};
		shoptet.externalShipping[myShippingName] = {
			modalContent: modalContent,
			onComplete: function (el) {
				//const inpost = "<inpost-geowidget id='geowidget' onpoint='onpointselect' token='eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJzQlpXVzFNZzVlQnpDYU1XU3JvTlBjRWFveFpXcW9Ua2FuZVB3X291LWxvIn0.eyJleHAiOjIwMzU0NDIzODcsImlhdCI6MTcyMDA4MjM4NywianRpIjoiYTA0MzUwNDMtMWZkOC00OTBiLTk5YjgtMTAzYzhlZTUyZTJhIiwiaXNzIjoiaHR0cHM6Ly9sb2dpbi5pbnBvc3QucGwvYXV0aC9yZWFsbXMvZXh0ZXJuYWwiLCJzdWIiOiJmOjEyNDc1MDUxLTFjMDMtNGU1OS1iYTBjLTJiNDU2OTVlZjUzNTptWWhzYldBWm41b2c0SFpLOXJPdjJrSndfaU9Ib01CMDAxdWhhOEhOWlcwIiwidHlwIjoiQmVhcmVyIiwiYXpwIjoic2hpcHgiLCJzZXNzaW9uX3N0YXRlIjoiNDJhNjY1MGItMWUyYy00MjRiLWFiYTctNjBlMzk4ZjJiOTRmIiwic2NvcGUiOiJvcGVuaWQgYXBpOmFwaXBvaW50cyIsInNpZCI6IjQyYTY2NTBiLTFlMmMtNDI0Yi1hYmE3LTYwZTM5OGYyYjk0ZiIsImFsbG93ZWRfcmVmZXJyZXJzIjoid2Vib3R2dXJjaS5teXNob3B0ZXQuY29tLCouYnJhaW5tYXJrZXQucGwsYnJhaW5tYXJrZXQucGwiLCJ1dWlkIjoiNzIyMDhjMzYtODYwZC00ZjI5LTk4NDktOTZhNTliMTk5NzFiIn0.i_jkhsManAcdFEB27i_MYGThWJuO4n2mXKrjHUlKk6dmepiKI7FCGv_Hmlqwq3cwKk3Mm_u3spMMnJH4nAfk5JDjzJuxRTY6TEeJqEVt4jzSI7Ng962y_LCPt692bPLwqu13zLeunjXbRyaKSnzJpT7LadzM-4zhvsHTL5T0kv3ehJB7Fc4NBdPm5_MD0yhrPX8JnU7GXIL519AgFiPkErETf-61q1k3VNxRO6mfi-kMCAC8sINgw0bdG7HRqIyXfO1BfwzA9Bfbt2oudsw9FQAuhb0lhAUMnxDkIZdtUVy_2U7gr66CaPwlK9L0vx86hrAl_nto3VfielOBkYXwPg' language='pl' config='parcelCollect'></inpost-geowidget>";

				//document.getElementById('c-wt-inpost-shipping-wrapper').innerHTML = inpost;

				console.log("modal complete");
				shoptet.modal.resize();
			},
			onClosed: function (el) {
				var ev = new CustomEvent("ShoptetExternalShippingChanged", {
					detail: shoptet.checkoutShared.externalShippingDetails[myShippingName],
				});
				el.dispatchEvent(ev);
			},
		};
		console.log(shoptet.externalShipping);

		invalidateLink.addEventListener("click", function (e) {
			e.preventDefault();
			shoptet.checkoutShared.externalShippingDetails[myShippingName].invalidate = true;
			shoptet.modal.close();
		});
	}

	function getShippingMethodGuid(callback) {
		fetch(
			"https://shoptet.webotvurci.cz/eshop-endpoints/" + getShoptetDataLayer().projectId + "/in-post/shipping-methods",
			{
				method: "GET",
				headers: { "X-Requested-With": "XMLHttpRequest" },
			}
		)
			.then(function (response) {
				if (!response.ok) {
					throw new Error("Network response was not ok");
				}
				return response.json();
			})
			.then(function (data) {
				const shippingMethod = data.data.shippingMethods.find(
					(method) => method.shippingCompany.code === myShippingName
				);
				if (shippingMethod) {
					callback(shippingMethod.guid);
				} else {
					console.error("Shipping method not found");
				}
			})
			.catch(function (error) {
				console.error("There has been a problem with your fetch operation:", error);
			});
	}
	function toCETISOString(date) {
		const offset = -60;
		const offsetHours = Math.abs(offset) / 60;
		const offsetMinutes = Math.abs(offset) % 60;
		const sign = offset < 0 ? "-" : "+";

		const isoString = date.toISOString().replace("Z", "");

		return isoString + `${sign}${offsetHours.toString().padStart(2, "0")}${offsetMinutes.toString().padStart(2, "0")}`;
	}

	function generateTrackingNumber(prefix) {
		const randomString = Math.random().toString(36).substring(2, 8).toUpperCase();
		return prefix + randomString;
	}

	document.addEventListener("onpointselect", (event) => {
		console.log(event.detail);
		sessionStorage.setItem("wt_temporary_inpost_data", JSON.stringify(event.detail));
		const trackingNumber = generateTrackingNumber("inpost_");
		const address = `${event.detail.address.line1}, ${event.detail.address.line2}`;

		getShippingMethodGuid(function (guid) {
			const url =
				"https://shoptet.webotvurci.cz/eshop-endpoints/" +
				getShoptetDataLayer().projectId +
				"/in-post/shipping-request/" +
				shoptet.checkoutShared.shippingRequestCode +
				"/" +
				guid;

			const expirationDate = new Date();
			expirationDate.setDate(expirationDate.getDate() + 14);

			// Určení časového posunu
			const offset = -expirationDate.getTimezoneOffset();
			const offsetHours = Math.floor(Math.abs(offset) / 60);
			const offsetMinutes = Math.abs(offset) % 60;
			const offsetSign = offset >= 0 ? "+" : "-";
			const formattedOffset = `${offsetSign}${offsetHours.toString().padStart(2, "0")}${offsetMinutes
				.toString()
				.padStart(2, "0")}`;

			const formattedExpiration = expirationDate.toISOString().slice(0, 19) + formattedOffset;

			const payload = {
				data: {
					description: `INPOST doručení na - ${event.detail.name}`,
					additionalText: `Adres: ${event.detail.address.line1}, ${event.detail.address.line2}, Otwarte: ${event.detail.opening_hours}, Płatności: ${event.detail.payment_point_descr}`,
					//   "expires": "2024-12-12T22:08:01+0100",
					expires: formattedExpiration,
					trackingNumber: trackingNumber,
					branchId: event.detail.name,
					branchName: `${event.detail.name} - ${event.detail.address.line1}, ${event.detail.address.line2}`,
					/* "deliveryAddress" : {
                        "street": `${event.detail.address_details.street}`,
                        "houseNumber": `${event.detail.address_details.building_number}`,
                        "city": `${event.detail.address_details.city}`,
                        "district": `${event.detail.address_details.province}`,
                        "zip": `${event.detail.address_details.post_code}`,   
                        "additional": `${event.detail.location_description}`,
                        "countryCode": "PL",
            
                    }*/
				},
			};

			console.log(JSON.stringify(payload));
			fetch(url, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
					"X-Requested-With": "XMLHttpRequest",
				},
				dataType: "json",
				body: JSON.stringify(payload),
			})
				.then((response) => response.json())
				.then((data) => {
					if (data.errors) {
						throw new Error("Error from API: " + data.errors);
					}
					console.log("data" + JSON.stringify(data.data.verificationCode));
					const verificationCode = data.data.verificationCode;

					shoptet.checkoutShared.externalShippingDetails[myShippingName].invalidate = false;
					shoptet.checkoutShared.externalShippingDetails[myShippingName].verificationCode = verificationCode;
					shoptet.checkoutShared.externalShippingDetails[myShippingName].expires = new Date(
						new Date().getTime() + 14 * 24 * 60 * 60 * 1000
					);
					shoptet.checkoutShared.externalShippingDetails[myShippingName].label.selected =
						event.detail.name + ": " + address;

					shoptet.modal.close();
					console.log("Shipping method updated successfully with verification code:", verificationCode);
				})
				.catch((error) => {
					console.error("There has been a problem with your fetch operation:", error);
				});
		});
	});
})(shoptet);
